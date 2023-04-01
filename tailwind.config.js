/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            fontSize: '1.05rem',
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            a: {
              color: theme('colors.sky[500]'),
              textDecoration: 'none',
              fontWeight: '500',
            },
            "a:hover": {
              color: theme('colors.sky[700]'),
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'a.anchor': {
              color: 'var(--tw-prose-title)',
              textDecoration: 'none',
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
