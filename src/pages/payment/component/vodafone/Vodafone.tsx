import {
  Box,
  Button,
  Container,
  Input,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { IconCaretLeftFilled, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "./Vodafone.module.css";
import image from "@assets/Alsafwa/cash.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { GetSubscriptionApi } from "@store/api/SubscriptionApi";
import { toast } from "react-toastify";

export default function Vodafone() {
  const { t } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { id, Name } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { plan } = useSelector((state: RootState) => state.Subscription);
  const [value, setValue] = useState(plan?.price);
  useEffect(() => {
    if (id) {
      dispatch(GetSubscriptionApi(Number.parseInt(id)));
      setValue(plan?.price);
    }
  }, [dispatch, id, plan?.price]);

  const getBackgroundColor = () => {
    return computedColorScheme === "light" ? "white" : "rgb(18,18,18)";
  };
  const getInputBackgroundColor = () => {
    return computedColorScheme === "light" ? "#f0f0f0" : "";
  };
  const [coupon, Setcoupon] = useState<string>("");
  const [status, SetStatus] = useState<boolean>(false);

  const validateDiscountCode = (code: string) => {
    if (code && plan?.coupons?.[0]?.couponText === code) {
      const discount = plan.price * (plan.coupons[0].couponPercntage / 100);
      setValue(plan.price - discount);
      toast.success("تم تطبيق الكود بنجاح");
      SetStatus(true);
    } else if (code.length > 0) {
      toast.warning("الكود غير صالح");
    } else {
      toast.warning("الكود فارغ");
    }
  };

  return (
    <Box c={computedColorScheme === "light" ? "black" : "white"}>
      <Container mt={50}>
        <Box mb={20} display={"flex"} style={{ alignItems: "center" }}>
          <IconCaretLeftFilled
            color={
              computedColorScheme === "light" ? "rgba(255, 109, 109, 1)" : "red"
            }
          />
          <Text fz={25} fw={700}>
            {t("Vodafone.subscriptions")}
          </Text>
        </Box>
        <Box
          bg={getInputBackgroundColor()}
          p={15}
          style={{ borderRadius: "15px" }}
          px={15}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            className={classes.handelFlex}>
            <Box>
              <form>
                <Box
                  mb={20}
                  display={"flex"}
                  style={{ gap: "2rem", justifyContent: "space-between" }}
                  className={classes.firstFiled}>
                  <Box w={"100%"}>
                    <label
                      className={classes.labelFelid}
                      htmlFor="subscriptionMap">
                      {t("Vodafone.subscriptionPlan")}
                    </label>
                    <Input
                      mt={5}
                      px={0}
                      styles={{
                        input: {
                          border: "0px",
                          backgroundColor: getBackgroundColor(),
                        },
                      }}
                      component="select"
                      rightSection={<IconChevronDown size={14} stroke={1.5} />}
                      pointer
                      disabled
                      id="subscriptionMap"
                      name="subscriptionMap"
                      className={classes.inputFiledSelect}>
                      <option defaultValue="year" disabled hidden>
                        {t("Vodafone.subscriptionPlan")}
                      </option>
                      <option value="0">{Name}</option>
                    </Input>
                  </Box>
                </Box>

                <Box
                  display={"flex"}
                  style={{
                    gap: "2rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className={classes.firstFiled}>
                  <Box w={"100%"}>
                    <Text className={classes.labelFelid}>
                      {t("Vodafone.amountDue")}
                    </Text>
                    <Text>{value} جم</Text>
                  </Box>

                  <Box w={"100%"} className={classes.StyleCode}>
                    <label className={classes.labelFelid} htmlFor="coupon">
                      {t("coupon")}
                    </label>
                    <input
                      type="text"
                      style={{
                        border: "0px",
                        backgroundColor: getBackgroundColor(),
                        marginTop: "5px",
                        padding: "auto 0px",
                      }}
                      id="coupon"
                      name="coupon"
                      placeholder="Coupon"
                      onChange={(e) => Setcoupon(e.target.value)}
                      className={classes.inputFiled}
                    />
                    {status ? (
                      <Button
                        className={classes.buttonRegister}>
                         تم تطبيق الكود
                      </Button>
                    ) : (
                      <Button
                        className={classes.buttonRegister}
                        onClick={() => {
                          validateDiscountCode(coupon);
                        }}>
                        تطبيق الكود
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            </Box>

            <Box
              display={"grid"}
              style={{ justifyContent: "center", alignItems: "center" }}>
              <Box mb={-40}>
                <img
                  src={image}
                  className={classes.imageHandel}
                  height={"auto"}
                  alt=""
                />
              </Box>
            </Box>
          </Box>

          <Box mt={50} ta={"center"} c={"red"}>
            <Text mb={25} fw={500} fz={18}>
              {t("Vodafone.transferNumber")}
            </Text>
            <Text mb={25} fw={700} fz={20}>
              ‏‪0 100 400 9170‬‏
            </Text>
            <Text mb={25} fw={700} fz={20}>
              ‏‪0 100 737 1548 ‬‏
            </Text>
            <Text mb={25} fw={500} fz={18}>
              {t("Vodafone.receiptInfo")}
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
