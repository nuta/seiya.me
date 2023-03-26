"use client";

import { useEffect, useState } from 'react';

export default function Email() {
    const chars = [
        196, 223, 222, 203,
        234, 217, 207, 195,
        211, 203, 132, 199,
        207
    ];
    const [text, setText] = useState('-');
    useEffect(() => {
        setText(chars.map(c => String.fromCharCode(c ^ 0xaa)).join(''));
    })

    return (
        <span>{text}</span>
    )
}
