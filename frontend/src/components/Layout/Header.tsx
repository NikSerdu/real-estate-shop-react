import { Button } from "@mui/material";
import { FC, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useAuth } from "../../hooks/useAuth";
import Container from "../Container";
import Auth from "../Home/Auth";
import Navbar from "../Home/Navbar";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { user } = useAuth();
  const { logout } = useActions();
  return (
    <Container className="relative">
      <div className="flex justify-between items-center absolute left-0 top-8 right-0">
        <div className="text-2xl">HOME</div>
        <Navbar />
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center flex-wrap gap-3">
            <Link to={"/favourites"} className="">
              <FaBookmark />
            </Link>
            {!user && (
              <div className="text-2xl" onClick={handleOpen}>
                <FiLogIn />
              </div>
            )}
            {user && (
              <Button variant="contained" onClick={logout}>
                Logout
              </Button>
            )}
          </button>
        </div>
      </div>
      <Auth handleClose={handleClose} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

export default Header;
