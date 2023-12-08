import cn from "clsx";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
const menu = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Properties",
    href: "/properties",
  },
  {
    id: 3,
    title: "Service",
    href: "/service",
  },
  {
    id: 4,
    title: "Contacts",
    href: "/contacts",
  },
  {
    id: 5,
    title: "About us",
    href: "/about-us",
  },
];

const Navbar: FC = () => {
  const location = useLocation();
  return (
    <div>
      <nav className="flex items-center flex-wrap gap-6 bg-white rounded-full px-8 py-5 ">
        {menu.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn("", {
                "text-blue-300":
                  location.pathname
                    .toLowerCase()
                    .split("/")
                    .includes(item.title.toLowerCase()) ||
                  (location.pathname === "/" && item.href === "/") ||
                  (location.pathname === "/about-us" &&
                    item.href === "/about-us"),
              })}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
