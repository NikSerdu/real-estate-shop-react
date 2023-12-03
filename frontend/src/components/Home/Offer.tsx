import { FC } from "react";
import Button from "../ui/Button";

const Offer: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2 h-[400px] block relative">
        <div className="w-[200px] h-[300px] bg-[url('assets/images/apart_3.jpg')] bg-cover bg-center absolute rounded-xl border-white border-2 top-[13%]"></div>
        <div className="w-[250px] h-[350px] bg-[url('assets/images/apart_2.webp')] bg-cover bg-center absolute left-16 rounded-xl border-white border-2 top-[7%]"></div>
        <div className="w-[300px] h-[400px] bg-[url('assets/images/apart_1.jpg')] bg-cover bg-center absolute left-32 rounded-xl border-white border-2"></div>
      </div>
      <div className="w-1/3">
        <div className="text-7xl">Elegant apartment</div>
        <div className="mt-5 text-lg font-bold">$ 99 000</div>
        <div className="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          dolor.
        </div>
        <Button text="Look" className="bg-black" />
      </div>
    </div>
  );
};

export default Offer;
