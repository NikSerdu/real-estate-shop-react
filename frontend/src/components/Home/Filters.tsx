import { FC } from "react";
import { BiBuildings } from "react-icons/bi";
import { BsBuildings } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { PiHouseBold } from "react-icons/pi";
import { TbBuildingCottage } from "react-icons/tb";
import { Link } from "react-router-dom";
const data = [
  {
    id: 1,
    text: "all",
    icon: <BsBuildings />,
    bgColor: "rgba(53, 96, 170, 0.1)",
    color: "rgba(53, 96, 170, 1)",
  },
  {
    id: 2,
    text: "land lots",
    icon: <TbBuildingCottage />,
    bgColor: "rgba(68, 183, 181, 0.1)",
    color: "rgba(68, 183, 181, 1)",
  },
  {
    id: 3,
    text: "office",
    icon: <FaRegBuilding />,
    bgColor: "rgba(79, 176, 127, 0.1)",
    color: "rgba(79, 176, 127, 1)",
  },
  {
    id: 4,
    text: "store",
    icon: <MdOutlineStoreMallDirectory />,
    bgColor: "rgba(181, 191, 79, 0.1)",
    color: "rgba(181, 191, 79, 1)",
  },
  {
    id: 5,
    text: "apartment",
    icon: <BiBuildings />,
    bgColor: "rgba(208, 135, 119, 0.1)",
    color: "rgba(208, 135, 119, 1)",
  },
  {
    id: 6,
    text: "villa",
    icon: <BsBuildings />,
    bgColor: "rgba(145, 52, 148, 0.1)",
    color: "rgba(145, 52, 148, 1)",
  },
  {
    id: 7,
    text: "house",
    icon: <PiHouseBold />,
    bgColor: "rgba(81, 61, 159, 0.1)",
    color: "rgba(81, 61, 159, 1)",
  },
];

const Filters: FC = () => {
  return (
    <div className="flex flex-wrap gap-10 px-10 py-10 rounded-full bg-white shadow-lg justify-between">
      {data.map((item) => {
        return (
          <Link to="/" key={item.id} className="text-center">
            <div
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
              className="rounded-full w-14 h-14 text-xl flex items-center justify-center"
            >
              {item.icon}
            </div>
            <div className="">{item.text}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Filters;
