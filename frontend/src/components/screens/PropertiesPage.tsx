import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { RealEstateService } from "../../services/realEstate.service";
import { IRealEstate } from "../../types/realEstate.interface";
import Container from "../Container";
import Card from "../Properties/Card";
import Button from "../ui/Button";

const PropertiesPage: FC = () => {
  const [favourites, setFavourites] = useState<IRealEstate[]>(
    JSON.parse(localStorage.getItem("favourites") || "") || []
  );

  const checkIsFavourite = (data: IRealEstate) => {
    return favourites.some(
      (item) => item.id === data.id && item.type === data.type
    );
  };

  const toggleFavourite = (data: IRealEstate) => {
    const isInclude = checkIsFavourite(data);
    if (isInclude) {
      setFavourites((prev) =>
        prev.filter((item) => !(item.id === data.id && item.type === data.type))
      );
    } else {
      setFavourites((prev) => [...prev, data]);
    }
  };
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);
  const { data } = useQuery(
    ["Get all real estate"],
    () => RealEstateService.getAll(),
    {
      select: (data) => data.data,
      // enabled: !!id
    }
  );
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
        {data &&
          data.map((item) => {
            const isFavourite = checkIsFavourite(item);
            return (
              <Card
                data={item}
                key={`${item.id}${item.type}`}
                isFavourite={isFavourite}
                toggleFavourite={toggleFavourite}
              />
            );
          })}
      </div>
    </Container>
  );
};

export default PropertiesPage;
