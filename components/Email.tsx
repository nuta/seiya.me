"use client";

import { useEffect, useState } from 'react';

function reverse(text) {
    let reversed = '';
    for (let i = text.length - 1; i >= 0; i--) {
        reversed += text[i];
    }
    return reversed;
}

export default function Email() {
    const chars = [
        196, 223, 222, 203,
        234, 217, 207, 195,
        211, 203, 132, 199,
        207
    ];

    const getEmail = () => {
        return chars.map(c => String.fromCharCode(c ^ 0xaa)).join('');
    }

    const [text, setText] = useState(reverse(getEmail()));

    const [styles, setStyles] = useState({
        "unicode-bidi": "bidi-override",
        direction: "rtl"
    });

    const reveal = () => {
            setText(getEmail());
            setStyles({});
    }

    const [user, domain] = text.split('@');
    let atmark = '';
    if (domain) {
        atmark = '@';
    }
    return (
        <span style={styles} onMouseOver={reveal}>
            {user}<span style={{display: "none"}}>invisible</span>{atmark}{domain}
        </span>
    )
}
