import cn from "clsx";
import { FC } from "react";
type TypeData = {
  text: string;
  className?: string;
  bg?: "black" | "white";
};

const Button: FC<TypeData> = ({ className, text, bg = "black" }) => {
  return (
    <button
      className={cn(
        "block mt-10 px-10 py-3  text-white rounded-full w-auto text-center",
        className,
        {
          "bg-black text-white": bg === "black",
          "bg-white text-black": bg === "white",
        }
      )}
    >
      {text}
    </button>
  );
};

export default Button;
