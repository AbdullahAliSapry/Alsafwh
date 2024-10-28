import SubscriptionCard from "@shared/subscriptioncard/SubscriptionCard";
import TitleSection from "@shared/titlesction/TitleSection";
import classes from "./Subscription.module.css";
import { Box } from "@mantine/core";
import { ISubscriptionPlan } from "@utilities/interfaces/PublicInterfce";
import { useTranslation } from "react-i18next";

export default function Subscription({
  plans,
}: {
  plans: ISubscriptionPlan[];
}) {
  const { t, i18n } = useTranslation();

  return (
    <Box mb={100} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <TitleSection title={t("Subscription.title")} />
      {plans.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>{t("Subscription.noPlans")}</h1>
      ) : (
        <Box className={classes.parent}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={plan.typeSubscription === 2 ? classes.centerCard : ""}
              style={{ height: "600px" }}>
              <SubscriptionCard plan={plan} />
            </div>
          ))}
        </Box>
      )}
    </Box>
  );
}
