import { FC, useEffect, useState } from "react";
import { IRealEstate } from "../../types/realEstate.interface";
import Container from "../Container";
import Card from "../Properties/Card";
import Button from "../ui/Button";

const Favourites: FC = () => {
  const [favourites, setFavourites] = useState<IRealEstate[]>(
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  const toggleFavourite = (data: IRealEstate) => {
    setFavourites((prev) =>
      prev.filter((item) => !(item.id === data.id && item.type === data.type))
    );
  };
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <Container>
      <div className="pt-28">
        <div className="flex flex-wrap gap-4 items-baseline ">
          <div className="w-4/5">
            <input
              type="text"
              placeholder="Search"
              className="bg-slate-200 rounded-full  w-full px-5 py-3 outline-none"
            />
          </div>
          <Button text="Search" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-7">
        {favourites &&
          favourites.map((item) => {
            return (
              <Card
                data={item}
                key={`${item.id}${item.type}`}
                isFavourite={true}
                toggleFavourite={toggleFavourite}
              />
            );
          })}
      </div>
    </Container>
  );
};

export default Favourites;
