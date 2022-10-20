import Wallpaper from 'components/layouts/Wallpaper'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from './index.module.scss'

function WhyAreYouInterestedInThis() {
    const chars = [
        196, 223, 222, 203,
        234, 217, 207, 195,
        211, 203, 132, 199,
        207
    ];
    const [text, setText] = useState('');
    useEffect(() => {
        setText(chars.map(c => String.fromCharCode(c ^ 0xaa)).join(''));
    })

    return (
        <span>{text}</span>
    )
}

export default function Index() {
    return (
        <Wallpaper meta={{ title: 'Seiya Nuta' }}>
            <Head>
                <title>Seiya Nuta</title>
            </Head>

            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headshot}>
                        <Image src="/me.jpg" height="112" width="100" alt="me" />
                    </div>
                    <div className={styles.tldr}>
                        <h1>
                            Seiya Nuta
                            <span className={styles.kanji}>(怒田 晟也)</span>
                        </h1>
                        <div>
                            An operating system kernel enthusiast.
                        </div>
                        <div className={styles.accounts}>
                            <span><a href="blog">Blog</a></span>
                            <span>&nbsp;・&nbsp;<a href="https://github.com/nuta">GitHub</a></span>
                            <span>&nbsp;・&nbsp;<a href="https://www.linkedin.com/in/seiyanuta">LinkedIn</a></span>
                            <br />
                            <span className={styles.email}><WhyAreYouInterestedInThis /></span>
                        </div>
                    </div>
                </header>

                <section>
                    <h1>Projects</h1>
                    <ul>
                        <li>
                            <h2><a href="https://github.com/nuta/resea">Resea</a></h2>
                            <p>
                                A minimalistic and policy-free microkernel based operating system written from scratch, with
                                TCP/IP, FAT file system,
                                hardware-accelerated hypervisor, and x86_64 / 64-bit ARM support.
                                I began this open source software project to develop a developer-friendly alternative to MINIX
                                and L4.
                            </p>
                        </li>
                        <li>
                            <h2><a href="https://github.com/nuta/kerla">Kerla</a></h2>
                            <p>
                                A monolithic kernel with Linux binary compatibility written from scratch in Rust.
                                I&apos;ve implemented basic *NIX kernel features like fork/execve, signals, mmap, pipe, poll,
                                tty/pty, tmpfs, UDP/TCP sockets, etc.
                                You can try it on an ephemeral demo microVM running Kerla: <code>ssh&nbsp;root@demo.kerla.dev</code>
                            </p>
                        </li>
                        <li>
                            <h2><a href="https://github.com/nuta/nsh">nsh</a></h2>
                            <p>
                                A almost-POSIX-compliant command-line shell written in Rust featuring
                                out-of-the-box features just like fish shell. It aims to be
                                drop-in replacement for Bash as an interactive shell.
                            </p>
                        </li>
                    </ul>
                </section>

                <section>
                    <h1>Experience</h1>
                    <ul>
                        <li><a href="https://summerofcode.withgoogle.com/archive/2019/projects/5871651231629312/">Google Summer
                            of Code 2019 student (LLVM Project)</a></li>
                        <li><a href="https://www.meti.go.jp/english/press/2017/0530_001.html">MITOU Program 2016 (Super Creator
                            Award)</a></li>
                        <li><a href="https://www.google-melange.com/archive/gsoc/2014/orgs/freebsd/projects/seiya.html">Google
                            Summer of Code 2014 student (FreeBSD Project)</a></li>
                    </ul>
                </section>
            </main >
        </Wallpaper >
    )
}
