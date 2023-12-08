import { FC, useEffect, useState } from "react";
import { IRealEstate } from "../../types/realEstate.interface";
import Container from "../Container";
import Card from "../Properties/Card";

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
      <div className="pt-28"></div>
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
