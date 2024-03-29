/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: ['20px', '28px'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            a: {
              textDecoration: 'underline',
              fontWeight: '500',
              textDecorationColor: "#a3a3a3",
              textUnderlineOffset: "2px",
            },
            "a:hover": {
              color: "var(--tw-prose-body) !important",
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'a.anchor': {
              color: 'var(--tw-prose-title)',
              textDecoration: 'none',
            },
            "code": {
              fontWeight: "normal",
              fontSize: "0.86em !important",
              fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace !important",
            },
            "h1, h2, h3, h4, h5, h6": {
              fontWeight: "700 !important",
            },
            "pre, pre[class*=language-]": {
              background: "#272b33",
              color: "#aab1bf",
            },
            "blockquote pre": {
              margin: '0 0px !important',
            },
            "span.comment": {
              fontWeight: "bold",
              color: "#8b92a0 !important",
            }
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
