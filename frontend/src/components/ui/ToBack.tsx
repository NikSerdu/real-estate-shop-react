import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ToBack: FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={goBack}>
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default ToBack;
