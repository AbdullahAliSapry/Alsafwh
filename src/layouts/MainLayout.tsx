import { Outlet } from "react-router-dom";
import "@mantine/core/styles.css";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import styles from "./MainLayout.module.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollBtn from "@pages/Home/component/scrollBtn/ScrollBtn";

const { MainLayoutStyle } = styles;
export default function MainLayout() {
  return (
    <>
      <ToastContainer
        theme="colored"
        autoClose={1000}
        position="top-center"
        style={{
          zIndex: "10000",
        }}
      />
      <ScrollBtn/>
      <div className={MainLayoutStyle}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
