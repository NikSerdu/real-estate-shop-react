import { FC } from "react";
import Container from "../Container";
import Button from "../ui/Button";
import Filters from "./Filters";
import Offer from "./Offer";
import Popular from "./Popular";

const Home: FC = () => {
  return (
    <div className="bg-hero-bg  bg-no-repeat">
      <Container className="">
        <div className="w-1/3 pt-52">
          <div className="uppercase text-7xl bolder">Find Your Dream</div>
          <div className="mt-10">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
            optio aspernatur eligendi placeat provident minus?
          </div>
          <Button text="Catalog" className="bg-black" />
        </div>
        <div className="mt-10">
          <Filters />
        </div>
        <div className="mt-20">
          <Offer />
        </div>
        <div className="mt-20 pt-20 relative">
          <div className="flex justify-center items-center">
            <img src="/blob_1.svg" className="absolute -z-10 -left-52" />
            <img
              src="/blob_2.svg"
              className="absolute right-[10%] top-0 -z-10 "
            />
            <div className="">
              <h1 className="text-4xl uppercase w-64">
                Best appartments near you
              </h1>
              <Button text="Explore" className="bg-black" />
            </div>
            <div className="relative">
              <div className="w-[400px] h-[400px] bg-[url('assets/images/apart_1.jpg')] bg-cover rounded-xl"></div>
            </div>
          </div>
        </div>
        <div className="mt-20 mb-5">
          <Popular />
        </div>
      </Container>
    </div>
  );
};

export default Home;
