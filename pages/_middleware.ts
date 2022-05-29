import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

const TARGETS = {
    '/gsoc19': '/blog/gsoc19',
    '/implementing-hypervisor-on-resea': '/blog/implementing-hypervisor-on-resea',
    '/implementing-linux-abi': '/blog/implementing-linux-abi',
    '/index': '/blog/index',
    '/intel-hd-audio': '/blog/intel-hd-audio',
    '/microkernel-book': '/blog/microkernel-book',
    '/my-kernel-is-too-fast-for-virbr0': '/blog/my-kernel-is-too-fast-for-virbr0',
    '/resea-101': '/blog/resea-101',
    '/resea-on-google-compute-engine': '/blog/resea-on-google-compute-engine',
    '/writing-a-microkernel-from-scratch': '/blog/writing-a-microkernel-from-scratch',
    '/writing-linux-clone-in-rust': '/blog/writing-linux-clone-in-rust',
}

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (TARGETS[req.nextUrl.pathname]) {
        const url = "https://seiya.me" + TARGETS[req.nextUrl.pathname];
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
