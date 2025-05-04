# A Diary of Writing a RISC-V Hypervisor

## Entering the guest

but instruction page faults


## First ecall

`PTE_U`

```rust
const BOOT_CODE: &[u8] = &[
    0x73, 0x00, 0x00, 0x00, // ecall
];
```

## Hello World from guest!

```
.section .text
.global _start

_start:
    li a0, 'H'
    li a7, 1
    ecall

    li a0, 'i'
    li a7, 1
    ecall

    li a0, '!'
    li a7, 1
    ecall

    li a0, '\n'
    li a7, 1
    ecall

    unimp
```

```
$ clang --target=riscv64 -march=rv64g -nostdlib -Wl,-Ttext=0x80200000 guest.S -o guest.elf
$ llvm-objcopy -O binary guest.elf guest.bin
```

## Building Linux

##

hedeleg - Linux uses stvec as a hack

## Device Tree

```

```

```
$ gobjdump -d linux/vmlinux | grep -A 5 801cace8 | head
ffffffff801cace8 <__pi_fdt32_ld>:
ffffffff801cace8:	00054783          	lbu	a5,0(a0)  <-- null deferecence here!
ffffffff801cacec:	00154703          	lbu	a4,1(a0)
ffffffff801cacf0:	0187979b          	slliw	a5,a5,0x18
```

## Debugging page faults after enabling MMU

```
epc:0xffffffff80005354, tval:0x0000000000000000, desc=hypervisor_ecall
epc:0x0000000080228144, tval:0xffffffff80263dc8, desc=store_page_fault
epc:0x0000000080227694, tval:0x00000000000000ab, desc=store_page_fault
epc:0x0000000080228144, tval:0xffffffff80263b78, desc=store_page_fault
epc:0x0000000080227694, tval:0x00000000000000ab, desc=store_page_fault
epc:0x0000000080228144, tval:0xffffffff80263928, desc=store_page_fault
epc:0x0000000080227694, tval:0x00000000000000ab, desc=store_page_fault
epc:0x0000000080228144, tval:0xffffffff802636d8, desc=store_page_fault
```

sp - do not forget to set sp register (or check your kernel's pc too)

## `rdtime` support


> hcounteren register is clear, attempts to read the cycle, time, instret, or hpmcounter n register while V=1 will cause a virtual-instruction exception

`hcounteren`, Hypervisor Counter-Enable Register, needs to be set

```rust
hcounteren |= 0xffff_ffff;
```

##

```

```

##

`lpj=1`

```
[kernel      ] INFO   vCPU: Calibrating delay loop (skipped) preset value.. 0.00 BogoMIPS (lpj=1)
[kernel      ] INFO   vCPU: pid_max: default: 32768 minimum: 301
[kernel      ] INFO   vCPU: Mount-cache hash table entries: 512 (order: 0, 4096 bytes, linear)
[kernel      ] INFO   vCPU: Mountpoint-cache hash table entries: 512 (order: 0, 4096 bytes, linear)
```


###

```
ffffffff80170dba <arch_cpu_idle>:
ffffffff80170dba:   0ff0000f            fence
ffffffff80170dbe:   10500073            wfi
ffffffff80170dc2:   8082                ret
```

`VTW=1` in `hstatus`

## Tips for future RISC-V Hackers

https://github.com/riscv-software-src/riscv-unified-db

