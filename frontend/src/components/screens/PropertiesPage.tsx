import { Pagination } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { RealEstateService } from "../../services/realEstate.service";
import { IRealEstate } from "../../types/realEstate.interface";
import Container from "../Container";
import Card from "../Properties/Card";
import ScrollToTop from "../ScrollToTop";
import Button from "../ui/Button";

const PropertiesPage: FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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
  const { data, refetch } = useQuery(
    ["Get all real estate"],
    () => RealEstateService.getAll(page, search),
    {
      select: (data) => data.data,
      onSuccess(data) {
        console.log(data.totalCount);
      },
    }
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <Container>
      <ScrollToTop trigger={page} />
      <div className="pt-28">
        <div className="flex flex-wrap gap-4 items-baseline ">
          <div className="w-4/5">
            <input
              type="text"
              placeholder="Search"
              className="bg-slate-200 rounded-full  w-full px-5 py-3 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  refetch();
                }
              }}
            />
          </div>
          <div className="" onClick={() => refetch()}>
            <Button text="Search" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-7">
        {data &&
          data.allRealEstates.map((item) => {
            const isFavourite = checkIsFavourite(item);
            return (
              <Card
                data={item}
                key={`${item.id}${item.type}`}
                isFavourite={isFavourite}
                toggleFavourite={toggleFavourite}
                refetch={refetch}
              />
            );
          })}
      </div>
      {data && (
        <div className="flex justify-center mt-5">
          <Pagination
            count={Math.ceil(data.totalCount / 10)}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </div>
      )}
    </Container>
  );
};

export default PropertiesPage;
