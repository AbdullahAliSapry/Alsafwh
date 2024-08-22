import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { HandlerPayMent } from "@store/api/PayMentApi";
import { IPayMentHandlerData } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";
import styles from "./StatusPayMent.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";

export default function StatusPayMent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.Payment);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams) {
      // Concatenate the data in the same order
      const concatenatedData = [
        queryParams.get("amount_cents"),
        queryParams.get("created_at"),
        queryParams.get("currency"),
        queryParams.get("error_occured"),
        queryParams.get("has_parent_transaction"),
        queryParams.get("id"),
        queryParams.get("integration_id"),
        queryParams.get("is_3d_secure"),
        queryParams.get("is_auth"),
        queryParams.get("is_capture"),
        queryParams.get("is_refunded"),
        queryParams.get("is_standalone_payment"),
        queryParams.get("is_voided"),
        queryParams.get("order"),
        queryParams.get("owner"),
        queryParams.get("pending"),
        queryParams.get("source_data.pan"),
        queryParams.get("source_data.sub_type"),
        queryParams.get("source_data.type"),
        queryParams.get("success"),
      ].join(""); // Join them into a single string

      const paymentData = {
        stringHmac: concatenatedData,
        success: queryParams.get("success") === "true",
        Amount: parseInt(queryParams.get("amount_cents") || "0") / 100,
        orderId: queryParams.get("order"),
        transactionId: queryParams.get("id"),
        hmac: queryParams.get("hmac"),
      };
      if (
        paymentData.stringHmac &&
        paymentData.Amount &&
        paymentData.hmac &&
        paymentData.orderId &&
        paymentData.transactionId
      ) {
        if (status == null)
          dispatch(HandlerPayMent(paymentData as IPayMentHandlerData));
      } else {
        navigate("/");
        toast.error("لم يتم التحقق من البيانات المرسلة");
        return;
      }
    } else {
      navigate("/");
      toast.error("لم يتم التحقق من البيانات المرسلة");
      return;
    }
  }, []);

  useEffect(() => {
    if (status) {
      toast.success(status ? "عملية الدفع نجحت" : "عملية الدفع فشلت");
      navigate("/");
    }
  }, []);
  return (
    <div>
      {status ? (
        <div className={styles.success}>
          <p>عمليه الدفع نجحت</p>
          <FaCheckCircle className={styles.checkIcon} />
        </div>
      ) : (
        <div className={styles.failed}>
          <p> عمليه الدفع فشلت</p>
          <HiOutlineXMark />
        </div>
      )}
    </div>
  );
}
