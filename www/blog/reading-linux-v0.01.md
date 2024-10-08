---
title: Exploring the internals of Linux v0.01
date: 2023-08-12
layout: blog
lang: en
---

Linux kernel is often mentioned as a overwhelmingly large open source software. As of this writing, the latest version is v6.5-rc5, which consists of 36M lines of code. Needless to say, Linux is a fruit of hard work of many contributors over the decades.

However, the first version of Linux, v0.01 was pretty small. It consisted of only 10,239 lines of code. Excluding comments and blank lines, it was only 8,670 lines. It's small enough to understand and is a good starting point to learn about the internals of UNIX-like operating system kernels.

Reading v0.01 was really fun for me. It was like visiting Computer History Museum in Mountain View - finally I witnessed *tales* are indeed true! I wrote this post to share this exciting experience with you. Let's dive in!

*Disclaimer: Obviously I'm not the author of Linux v0.01. If you find any mistakes in this post, please let me know!*


## How do system calls look like?

v0.01 has 66 system calls. Here's the list of them:

```
access acct alarm break brk chdir chmod
chown chroot close creat dup dup2 execve
exit fcntl fork fstat ftime getegid geteuid
getgid getpgrp setsid getpid getppid
getuid gtty ioctl kill link lock lseek
mkdir mknod mount mpx nice open pause
phys pipe prof ptrace read rename rmdir
setgid setpgid setuid setup signal stat
stime stty sync time times ulimit umask
umount uname unlink ustat utime waitpid write
```

- It supports reading, writing, creating, and deleting files and directories. Also, other fundamental concepts like `chmod(2)` (permission), `chown(2)` (owner), and `pipe(2)` (inter-process communication) are also supported.
- `fork(2)` and `execve(2)` were there. Only `a.out` executable format was supported.
- The concept of sockets was not implemented. Thus, no network support.
- Some features like `mount(2)` were not implemented. They just return `ENOSYS`:

```c
int sys_mount()
{
	return -ENOSYS;
}
```

## Deeply hardcoded for Intel 386 architecture

There is [a very famous debate](https://www.oreilly.com/openbook/opensources/book/appa.html) Linus had with Andrew S. Tanenbaum, the author of MINIX, about the design of operating systems: monolithic vs. microkernel, which is better design? 

Tanenbaum [pointed out that](https://www.oreilly.com/openbook/opensources/book/appa.html#:~:text=LINUX%20is%20tied%20fairly%20closely%20to%20the%2080x86) Linux is (or *was*) not portable because it was deeply hardcoded for Intel 386 (i386):

>   MINIX was designed to be reasonably portable, and has been ported from the Intel line to the 680x0 (Atari, Amiga, Macintosh), SPARC, and NS32016. LINUX is tied fairly closely to the 80x86.  Not the way to go.

It's indeed true. Linux v0.01 was deeply hardcoded for i386. Here's the implementation of `strcpy` in `include/string.h`:

```c
extern inline char * strcpy(char * dest,const char *src)
{
__asm__("cld\n"
	"1:\tlodsb\n\t"
	"stosb\n\t"
	"testb %%al,%%al\n\t"
	"jne 1b"
	::"S" (src),"D" (dest):"si","di","ax");
return dest;
}
```

It's written in assembly with string instructions of i386. Yes it can be found as an optimized implementation of `strcpy` in [today's Linux](https://elixir.bootlin.com/linux/v6.4.10/source/arch/x86/lib/string_32.c#L19), but it's in `include/string.h` - not in somewhere like `include/i386/string.h`. Moreover, no `#ifdef` to switch the implementation for different architectures. It's just hardcoded for Intel 386.

Also, only PC/AT devices were supported:

- [CMOS](https://wiki.osdev.org/CMOS): Real-time clock (`init/main.c`).
- [Programmable Interval Timer (PIT)](https://wiki.osdev.org/Programmable_Interval_Timer): Timer (`kernel/sched.c`).
- [ATA (PIO)](https://wiki.osdev.org/ATA_PIO_Mode): Hard disk (`kernel/hd.c`).
- [VGA (text mode)](https://wiki.osdev.org/VGA_Hardware): Display (`kernel/console.c`).
- [Intel 8042](https://wiki.osdev.org/%228042%22_PS/2_Controller): PS/2 Keyboard (`kernel/keyboard.s`). Yes it's completely written in assembly!

As you may noticed, they're not in `drivers` directory as in today's Linux. They're hardcoded in core subsystems.

## "FREAX"

I've read in somewhere that Linus originally named his kernel "FREAX". Makefile in *Linux* v0.01 still had the following comment:

```
# Makefile for the FREAX-kernel.
```

It was indeed FREAX!

## What's the file system supported in v0.01?

Today, Linux supports a variety of file systems such as ext4, Btrfs, and XFS. What about v0.01? ext2? Nope, here's a hint from `include/linux/fs.h`:

```c
#define SUPER_MAGIC 0x137F
```

The answer is, as [GPT-4 correctly guessed](https://sdk.vercel.ai/r/XR1FQfg), [MINIX file system](https://en.wikipedia.org/wiki/Minix_file_system)!

Fun fact: [ext](https://en.wikipedia.org/wiki/Extended_file_system) ("extended file system"), the predecessor of ext2/ext3/ext4, is inspired by MINIX file system.

## There "probably" won't be any reason to change the scheduler

Here's the scheduler of Linux v0.01:

```c
	while (1) {
		c = -1;
		next = 0;
		i = NR_TASKS;
		p = &task[NR_TASKS];
		while (--i) {
			if (!*--p)
				continue;
			if ((*p)->state == TASK_RUNNING && (*p)->counter > c)
				c = (*p)->counter, next = i;
		}
		if (c) break;
		for(p = &LAST_TASK ; p > &FIRST_TASK ; --p)
			if (*p)
				(*p)->counter = ((*p)->counter >> 1) +
						(*p)->priority;
	}
	switch_to(next);
```

`i` and `p` hold the task's index in the task table (not PID!) and the pointer to `task_struct` respectively. The key variable is `counter` in `task_struct` (`(*p)->counter`). The scheduler picks up the task with the largest `counter` value and switches to it. If all runnable tasks have counter value of 0, it updates each task's `counter` value by `counter = (counter >> 1) + priority` and restarts the loop. Note that `counter >> 1` is a faster way to divide by 2.

The key point would be the counter update. It also updates the counter value of non-runnable tasks. This means that if a task is waiting for I/O for a *long time*, and its priority is higher than 2, counter value will ~monotonically increase~ *increase until a certain upper bound (edited)* when counter is updated. This is just my guess, but I think this is for prioritizing rarely-runnable-but-latency-sensitive tasks like shell, which would waits for keyboard typing in most of the life.

Lastly, `switch_to(next)` is a macro which switches the CPU context to the picked task. It's well described in [here](https://www.maizure.org/projects/evolution_x86_context_switch_linux/). In short, it was based on a x86-specific feature called [Task State Segment (TSS)](https://en.wikipedia.org/wiki/Task_state_segment), which is no longer used for task management in x86-64 architecture.

By the way, there's an interesting comment about the scheduler:

```
 *  'schedule()' is the scheduler function. This is GOOD CODE! There
 * probably won't be any reason to change this, as it should work well
 * in all circumstances (ie gives IO-bound processes good response etc).
```

Yes it's indeed good code. Unfortunately (or fortunately), this prophecy is false. Linux became one of most practical and performant kernel which has introduced many scheduling improvements and new algorithms over the years, like Completely Fair Scheduler (CFS).

## Kernel panic in 5 lines

```c
volatile void panic(const char * s)
{
	printk("Kernel panic: %s\n\r",s);
	for(;;);
}
```

Let the user know it went wrong, and hang the system. Period.

## `fork(2)` in kernel space?

The main portion of kernel initialization can be found in `init/main.c` (fun fact: this file still exists in today's Linux kernel and initializes the kernel):

```c
void main(void)		/* This really IS void, no error here. */
{			/* The startup routine assumes (well, ...) this */
/*
 * Interrupts are still disabled. Do necessary setups, then
 * enable them
 */
	time_init();
	tty_init();
	trap_init();
	sched_init();
	buffer_init();
	hd_init();
	sti();
	move_to_user_mode();
	if (!fork()) {		/* we count on this going ok */
		init();
	}
/*
 *   NOTE!!   For any other task 'pause()' would mean we have to get a
 * signal to awaken, but task0 is the sole exception (see 'schedule()')
 * as task 0 gets activated at every idle moment (when no other tasks
 * can run). For task0 'pause()' just means we go check if some other
 * task can run, and if not we return here.
 */
	for(;;) pause();
}

void init(void)
{
	int i,j;

	setup();
	if (!fork())
		_exit(execve("/bin/update",NULL,NULL));
	(void) open("/dev/tty0",O_RDWR,0);
	(void) dup(0);
	(void) dup(0);
	printf("%d buffers = %d bytes buffer space\n\r",NR_BUFFERS,
		NR_BUFFERS*BLOCK_SIZE);
	printf(" Ok.\n\r");
	if ((i=fork())<0)
		printf("Fork failed in init\r\n");
	else if (!i) {
		close(0);close(1);close(2);
		setsid();
		(void) open("/dev/tty0",O_RDWR,0);
		(void) dup(0);
		(void) dup(0);
		_exit(execve("/bin/sh",argv,envp));
	}
	j=wait(&i);
	printf("child %d died with code %04x\n",j,i);
	sync();
	_exit(0);	/* NOTE! _exit, not exit() */
}
```

It calls each subsystem's initialization functions. Pretty straightforward. But there's something interesting: it calls `fork(2)` in kernel's `main()`. Also, `init()` looks like an ordinary implementation in user space, but it's hardcoded in the kernel code!

It looks as if it's fork(2)-ing in the kernel space, but it's actually not. The trick is in `move_to_user_mode()`:

```c
#define move_to_user_mode() \
__asm__ ("movl %%esp,%%eax\n\t" \ // EAX = current stack pointer
	"pushl $0x17\n\t" \           // SS (user data seg)
	"pushl %%eax\n\t" \           // ESP
	"pushfl\n\t" \                // EFLAGS
	"pushl $0x0f\n\t" \           // CS (user code seg)
	"pushl $1f\n\t" \             // EIP (return address)
	"iret\n" \                    // switch to user mode
	"1:\tmovl $0x17,%%eax\n\t" \  // IRET returns to this address
	"movw %%ax,%%ds\n\t" \        // Set DS to user data segment
	"movw %%ax,%%es\n\t" \        // Set ES to user data segment
	"movw %%ax,%%fs\n\t" \        // Set FS to user data segment
	"movw %%ax,%%gs" \            // Set GS to user data segment
	:::"ax")                      // No RET instruction here: 
                                  // continue executing following
                                  // lines!
```

You don't need to fully understand the assembly code above. What it does is to switch to the user mode using [IRET instruction](https://wiki.osdev.org/Getting_to_Ring_3#iret_method) but continue executing the following lines in the kernel code with the current stack pointer! Thus, the following `if (!fork())` is executed in user mode and `fork(2)` is actually a system call.

## Linus didn't have a machine with 8MB RAM

```
 * For those with more memory than 8 Mb - tough luck. I've
 * not got it, why should you :-) The source is here. Change
 * it. (Seriously - it shouldn't be too difficult. ...
```

Today, machines with 8GB RAM are very common. Furthermore, 8GB is not enough at all for software engineers ;)

## Hard to compile with modern toolchains

Lastly, I tried to compile the kernel with modern toolchains but failed to do so. I thought GCC (or C itself) has good backward compatibility, but it's not sufficient. Even with older standard `-std=gnu90` caused compile errors that are not trivial to fix.

One fun fact is Linus had used his own GCC with a feature named `-mstring-insns`:

```
# If you don't have '-mstring-insns' in your gcc (and nobody but me has :-)
# remove them from the CFLAGS defines.
```

I'm not sure what it is, but it seems to be a feature to support (or optimize?) [x86 string instructions](https://www.cs.uaf.edu/2017/fall/cs301/lecture/10_06_string_inst.html).

If you managed to compile the kernel with modern toolchains, write an article and send me a link :D

## Read Yourself!

I hope you enjoyed reading the source code of Linux v0.01 as much as I did. If you're interested in v0.01, download [the tarball of v0.01 from kernel.org](https://cdn.kernel.org/pub/linux/kernel/Historic/linux-0.01.tar.gz). Reading the code is not so hard especially if you've read [xv6](https://github.com/mit-pdos/xv6-public) before. Linux v0.01 is minimalistic but is very well written.
