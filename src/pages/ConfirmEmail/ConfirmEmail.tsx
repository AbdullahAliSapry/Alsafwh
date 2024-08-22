import { GiConfirmed } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import styles from "./ComfirmEmail.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { verifyEmail } from "@store/api/AuthApi";
import { FaRegCircleXmark } from "react-icons/fa6";

export default function ConfirmEmail() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { IsConfirmed, MessageConfirmed } = useSelector(
    (state: RootState) => state.Auth
  );
console.log(MessageConfirmed);

  const [Email, setEmail] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");
    if (!token || !email) return;
    console.log("enter");
    setEmail(email);
    dispatch(verifyEmail(token, email));
  }, [location.search, dispatch]);

  return (
    <div className={styles.parent}>
      {IsConfirmed ? (
        <>
          <p>تم تاكيد هذا البريد الاكتروني {Email} بنجاح </p>
          <GiConfirmed />
          <Link to={`/`}>العوده لصفحه الرئيسيه</Link>
        </>
      ) : (
        <>
          <p className={styles.Invalid}>{MessageConfirmed}</p>
          <FaRegCircleXmark className={styles.Invalid} />
          <Link to={`/`}>العوده لصفحه الرئيسيه</Link>
        </>
      )}
    </div>
  );
}
