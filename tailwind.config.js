/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // fontSize: '1.05rem',
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
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'a.anchor': {
              color: 'var(--tw-prose-title)',
              textDecoration: 'none',
            },
            "code": {
              fontWeight: "normal",
            },
            "pre, pre[class*=language-]": {
              background: "#272b33",
              color: "#aab1bf",
              margin: '0 -120px !important',
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
