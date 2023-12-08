import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const data = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet.",
    img: "assets/images/apart_1.jpg",
    price: "$90 000",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet.",
    img: "assets/images/apart_1.jpg",
    price: "$90 000",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet.",
    img: "assets/images/apart_1.jpg",
    price: "$90 000",
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet.",
    img: "assets/images/apart_1.jpg",
    price: "$90 000",
  },
];

const Popular: FC = () => {
  return (
    <div className="text-center">
      <div className="font-medium text-4xl">Popular</div>
      <div className="flex mt-5">
        <div className="w-2/3 flex flex-wrap gap-10">
          {data.map((item) => {
            return (
              <Link to={"/"} key={item.id} className="text-center">
                <div
                  className={`bg-[url('${item.img}')] w-[300px] h-[150px] rounded-xl bg-cover`}
                ></div>
                <div className="">{item.text}</div>
                <div className="font-bold">{item.price}</div>
              </Link>
            );
          })}
        </div>
        <div className="w-1/3  py-10  rounded-xl bg-[url('assets/images/subscribe-bg.svg')] ">
          <div className="w-2/3 mx-auto text-center">
            <h1 className="uppercase text-4xl ">Lorem ipsum dolor sit amet.</h1>
            <p className="text-sm mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, quaerat.
            </p>
            <input
              type="text"
              className="bg-white bg-opacity-20 rounded-full px-3 py-2 outline-none text-black placeholder:text-black mt-10 placeholder:text-sm"
              placeholder="Email"
            />
            <Button text="Subscribe" className="mx-auto  " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
