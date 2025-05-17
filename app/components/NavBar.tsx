import Link from "next/link"

const navItems = [
  {
    label: "about",
    href: "/",
  },
  {
    label: "blog",
    href: "/blog",
  },
  {
    label: "github",
    href: "https://github.com/nuta",
  },

]

export default function Navbar() {
  return (
    <nav
      className="flex flex-row items-start mb-8"
    >
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} prefetch={false} className="py-1 pr-6">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
