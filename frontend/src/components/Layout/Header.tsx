import cn from "clsx";
import { FC, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import Container from "../Container";
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

const Header: FC = () => {
  const [indexPage, setIndexPage] = useState(1);
  return (
    <Container className="relative">
      <div className="flex justify-between items-center absolute left-0 top-8 right-0">
        <div className="text-2xl">HOME</div>
        <nav className="flex items-center flex-wrap gap-6 bg-white rounded-full px-8 py-5 ">
          {menu.map((item) => {
            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn("", {
                  "text-blue-300": item.id === indexPage,
                })}
                onClick={() => setIndexPage(item.id)}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center flex-wrap gap-3">
            <Link to={"/favourites"} className="">
              <FaBookmark />
            </Link>
            <div className="text-2xl">
              <FiLogIn />
            </div>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Header;
