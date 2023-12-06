import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useClickOutside } from "../../hooks/useClickOutside";

const User: FC = () => {
  const { logout } = useActions();
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef();
  useClickOutside(menuRef, () => {
    if (open) setTimeout(() => setOpen(false), 50);
  });
  return (
    <div className="relative w-auto">
      <div
        ref={menuRef}
        className={cn(
          "px-2 py-2 rounded-tr-xl rounded-tl-xl  flex justify-center text-xl"
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaUserCircle />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "  rounded-xl bg-white flex flex-col  absolute top-9  -left-10 ",
              {
                "w-28": open,
              }
            )}
          >
            <div className="hover:bg-slate-100 px-2 py-2 hover:rounded-tr-xl hover:rounded-tl-xl">
              <Link to={"create"}>Create</Link>
            </div>
            <div className="hover:bg-slate-100 px-2 py-2">
              <Link to={"my-properties"}>My properties</Link>
            </div>
            <div
              className="hover:bg-slate-100 px-2 py-2 hover:rounded-br-xl hover:rounded-bl-xl"
              onClick={logout}
            >
              <Link to={"/"}>Logout</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default User;
