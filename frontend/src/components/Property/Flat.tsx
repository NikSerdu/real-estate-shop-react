import { FC, useState } from "react";
import { useMutation } from "react-query";
import Slider from "react-slick";
import { FlatService } from "../../services/flat.service";
import { IFlat } from "../../types/flat.interface";
import Button from "../ui/Button";
import ToBack from "../ui/ToBack";

const settings = {
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

type TypeData = {
  data: IFlat;
};

const Flat: FC<TypeData> = ({ data }) => {
  const {
    address,
    area,
    description,
    floor,
    hasBalcony,
    price,
    rooms,
    title,
    images,
    numberOfPhone,
    id,
  } = data;
  const [calcPrice, setCalcPrice] = useState<number>(0);
  const { mutateAsync } = useMutation(
    "Get flat price",
    () => FlatService.getPrice(id),
    {
      onSuccess(data) {
        setCalcPrice(data.data);
      },
    }
  );
  return (
    <div>
      <div className="pt-28">
        <ToBack />
        <div className="mt-4 flex  gap-20">
          <div className="w-1/2">
            <Slider {...settings}>
              {images.map((item, index) => {
                return (
                  <div className="" key={index}>
                    <img src={item.url} className="rounded-xl" />
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="w-1/2 flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p>Price: ${price}</p>
            <p>Adress: {address}</p>
            <p>Area: {area}</p>
            <p>Floor: {floor}</p>
            <p>Has balcony: {hasBalcony ? "yes" : "no"}</p>
            <p>Rooms: {rooms}</p>
            <p>Phone: {numberOfPhone}</p>
            {calcPrice !== 0 && <p>Site price: ${calcPrice}</p>}
            <div className="flex gap-3">
              <Button text="Save" />
              <div className="" onClick={() => mutateAsync()}>
                <Button text="Calculate price" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 mb-5">{description}</div>
    </div>
  );
};

export default Flat;
