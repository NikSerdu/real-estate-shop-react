import { FC } from "react";
import { FaRegCopyright } from "react-icons/fa";
const Footer: FC = () => {
  return (
    <div className="bg-[#C0D8FF] justify-center text-black py-2 flex items-center flex-wrap gap-3 h-10">
      <FaRegCopyright /> Copyright, 2023
    </div>
  );
};

export default Footer;
