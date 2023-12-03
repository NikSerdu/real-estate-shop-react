import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <div className={`max-w-6xl mx-auto ${className}`}>{children}</div>;
};

export default Container;
