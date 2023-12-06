import { FC } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaBuilding } from "react-icons/fa";
import { FaBookmark, FaHouse, FaRegBookmark } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { FlatService } from "../../services/flat.service";
import { HouseService } from "../../services/house.service";
import { IRealEstate } from "../../types/realEstate.interface";
type TypeData = {
  data: IRealEstate;
  toggleFavourite?: (data: IRealEstate) => void;
  isFavourite?: boolean;
  hasDelete?: boolean;
  refetch: () => void;
};

const Card: FC<TypeData> = ({
  data,
  isFavourite = false,
  toggleFavourite = () => {},
  hasDelete = false,
  refetch,
}) => {
  const { description, id, images, price, title, type, createdAt } = data;

  const { mutateAsync } = useMutation(
    ["Delete"],
    (id: number) =>
      type === "house" ? HouseService.delete(id) : FlatService.delete(id),
    {
      onSuccess() {
        refetch();
      },
    }
  );

  return (
    <div className="flex gap-3 ">
      <Link
        to={`http://localhost:5173/properties/${type}/${id}`}
        className="w-1/2 h-[200px] bg-cover rounded-xl bg-center"
        style={{
          backgroundImage: `url('${images[0].url}')`,
        }}
      ></Link>
      <Link
        to={`http://localhost:5173/properties/${type}/${id}`}
        className="mt-5"
      >
        <div className="h1 text-3xl font-bold">$ {price}</div>
        <p className="font-semibold">{title}</p>
        <p className="font-semibold flex items-center gap-2">
          Type: {type === "flat" && <FaBuilding />}
          {type === "house" && <FaHouse />}
        </p>
        <p>{description}</p>
      </Link>
      <div className="ml-auto flex flex-col justify-between items-end">
        {!hasDelete && (
          <button
            className="rounded-full h-[40px] w-[40px] bg-slate-100 flex justify-center items-center"
            onClick={() => toggleFavourite(data)}
          >
            {isFavourite ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        )}
        {hasDelete && (
          <div
            onClick={() => mutateAsync(id)}
            className="text-xl text-red-600 hover:cursor-pointer"
          >
            <MdDelete />
          </div>
        )}
        <div className="flex items-center gap-2 font-semibold">
          <CiCalendarDate />{" "}
          {("" + new Date(createdAt).toISOString()).replace(
            /^([^T]+)T(.+)$/,
            "$1"
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
