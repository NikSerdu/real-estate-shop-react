import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { FlatService } from "../../services/flat.service";
import { HouseService } from "../../services/house.service";
import Container from "../Container";
import Flat from "../Property/Flat";
import House from "../Property/House";

const PropertyPage: FC = () => {
  const { id, type } = useParams();
  let data: any;

  if (!id) {
    return;
  }

  if (type === "house") {
    const { data: houseData } = useQuery(
      ["Get house"],
      () => HouseService.getById(+id),
      {
        select: (data) => data.data,
      }
    );
    data = houseData;
  } else {
    const { data: flatData } = useQuery(
      ["Get flat"],
      () => FlatService.getById(+id),
      {
        select: (data) => data.data,
      }
    );
    data = flatData;
  }

  return (
    <Container>
      {type === "house" && data && <House data={data} />}
      {type === "flat" && data && <Flat data={data} />}
    </Container>
  );
};

export default PropertyPage;
