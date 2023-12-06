import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { useQuery } from "react-query";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { RealEstateService } from "../../services/realEstate.service";
import Container from "../Container";
import Card from "../Properties/Card";

const MyProperties: FC = () => {
  const id = useTypedSelector((state) => state.user.user?.userId);
  if (!id) {
    return;
  }
  const { data, refetch } = useQuery(
    ["Get my properties"],
    () => RealEstateService.getByUserId(id),
    {
      select: (data) => data.data,
    }
  );
  return (
    <Container>
      <div className="flex flex-col gap-4 pt-28">
        <AnimatePresence>
          {data &&
            data.map((item) => {
              return (
                <motion.div
                  className=""
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -1000 }}
                  key={`${item.id}${item.type}`}
                >
                  <Card
                    data={item}
                    refetch={refetch}
                    hasDelete={true}
                    key={`${item.id}${item.type}`}
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default MyProperties;
