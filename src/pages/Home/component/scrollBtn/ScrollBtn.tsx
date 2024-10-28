import { IoArrowUpCircleOutline } from "react-icons/io5";
import classes from "./ScrollBtn.module.css";
import { useEffect, useState } from "react";

export default function ScrollBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {        
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);




  return (
    <div>
      {isVisible && (
        <div className={classes.parent} onClick={handleScroll}>
          <IoArrowUpCircleOutline />
        </div>
      )}
    </div>
  );
}
