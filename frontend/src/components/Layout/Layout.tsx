import { FC, PropsWithChildren } from "react";
import Container from "../Container";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="relative">
      <Container>
        <Header />
      </Container>
      <div
        className="pb-5"
        style={{
          minHeight: "calc(100vh - 40px)",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
