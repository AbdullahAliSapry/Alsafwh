import classes from "./SubscriptionCard.module.css";
import { IoMdCheckmark } from "react-icons/io";
import { ISubscriptionPlan } from "@utilities/interfaces/PublicInterfce";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/Store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function SubscriptionCard({
  plan,
}: {
  plan: ISubscriptionPlan;
}) {
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleClick = () => {
    if (!AuthModel) {
      return toast.info(t("SubscriptionCard.loginPrompt"));
    }
    navigate(`/payment/${plan.id}/${plan.name}`);
  };

  return (
    <div className={classes.card}>
      <div>
        <h3 className={classes.title}>
          {plan.typeSubscription == 0
            ? t("SubscriptionCard.Month")
            : plan.typeSubscription == 1
            ? t("SubscriptionCard.Year")
            : t("SubscriptionCard.Mid")}
          {plan.typeSubscription === 2
            ? ` (${t("SubscriptionCard.recommended")})`
            : ""}
        </h3>
        <p
          className={classes.price}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          {plan.price} {t("SubscriptionCard.Coin")}
        </p>
        <p className={classes.description}>
          {plan.description}
          {plan.typeSubscription === 2
            ? ` (${t("SubscriptionCard.recommended")})`
            : ""}
        </p>
      </div>
      <div>
        <ul
          className={classes.features}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          <li>
            <IoMdCheckmark className={classes.icon} />{" "}
            {plan.typeSubscription == 0
              ? t("SubscriptionCard.Month")
              : plan.typeSubscription == 1
              ? t("SubscriptionCard.Year")
              : t("SubscriptionCard.Mid")}
          </li>
          <li>
            <IoMdCheckmark className={classes.icon} />{" "}
            {t("SubscriptionCard.educationalVideos")}
          </li>
          <li>
            <IoMdCheckmark className={classes.icon} />{" "}
            {t("SubscriptionCard.previousExams")}
          </li>
          <li>
            <IoMdCheckmark className={classes.icon} />{" "}
            {t("SubscriptionCard.topTeachers")}
          </li>
        </ul>
      </div>
      <button className={classes.subscribeButton} onClick={handleClick}>
        {t("SubscriptionCard.subscribe")}
      </button>
    </div>
  );
}
