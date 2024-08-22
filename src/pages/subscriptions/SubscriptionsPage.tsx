import { Box, Container, Text, useComputedColorScheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetAllSubscriptionApi } from "@store/api/SubscriptionApi";
import Subscription from "@pages/Home/component/subscription/Subscription";
import { useTranslation } from "react-i18next";

export default function SubscriptionsPage() {
  const { t, i18n } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { plans } = useSelector((state: RootState) => state.Subscription);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (plans.length === 0) dispatch(GetAllSubscriptionApi());
  }, [dispatch, plans]);

  return (
    <Box mt={80}>
      <Container>
        <Text
          fz={25}
          style={{ textAlign: "center" }}
          fw={700}
          c={"rgba(38, 180, 252, 1)"}>
          {t("subscriptionsPage.knowMore")}
        </Text>

        <Box
          my={50}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          bg={
            computedColorScheme === "light"
              ? "rgba(237, 237, 237, 1)"
              : "rgb(26,43,66)"
          }
          p={10}
          pl={15}
          style={{ borderRadius: "15px" }}>
          <ul style={{ listStyle: "inherit", color: "rgba(38, 180, 252, 1)" }}>
            {plans.map((plan) => (
              <li key={plan.id}>
                <Text
                  c={
                    computedColorScheme === "light"
                      ? "rgba(38, 180, 252, 1)"
                      : "white"
                  }
                  mb={20}>
                  {plan.typeSubscription == 0
                    ? t("SubscriptionCard.Month")
                    : plan.typeSubscription == 1
                    ? t("SubscriptionCard.Year")
                    : t("SubscriptionCard.Mid")}
                  {plan.typeSubscription === 2
                    ? ` (${t("SubscriptionCard.recommended")})`
                    : ""}
                </Text>
                <Text c={computedColorScheme === "light" ? "black" : "white"}>
                  {plan.description}
                </Text>
                <Text
                  pb={10}
                  c={computedColorScheme === "light" ? "black" : "white"}>
                  {t("subscriptionsPage.amount")}
                  <span style={{ color: "rgba(38, 180, 252, 1)" }}>
                    {plan.price} {t("SubscriptionCard.Coin")}
                  </span>
                </Text>
              </li>
            ))}
          </ul>
        </Box>
      </Container>

      <Subscription plans={plans} />
    </Box>
  );
}
