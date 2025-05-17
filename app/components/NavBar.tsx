import Link from "next/link"

const navItems = [
  {
    label: "about",
    href: "/",
    prefetch: true,
  },
  {
    label: "blog",
    href: "/blog",
    prefetch: true,
  },
  {
    label: "github",
    href: "https://github.com/nuta",
    prefetch: false,
  },

]

export default function Navbar() {
  return (
    <nav
      className="flex flex-row items-start mb-8"
    >
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} prefetch={item.prefetch} className="py-1 pr-8">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
