import {
  Box,
  Container,
  Input,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { IconCaretLeftFilled, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "./Vodafone.module.css";
import image from "@assets/Alsafwa/cash.png";

export default function Vodafone() {
  const { t } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const getBackgroundColor = () => {
    return computedColorScheme === "light" ? "white" : "rgb(18,18,18)";
  };

  const getInputBackgroundColor = () => {
    return computedColorScheme === "light" ? "#f0f0f0" : "";
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
                      id="subscriptionMap"
                      name="subscriptionMap"
                      className={classes.inputFiledSelect}>
                      <option defaultValue="year" disabled hidden>
                        {t("Vodafone.subscriptionPlan")}
                      </option>
                      <option value="1">1</option>
                    </Input>
                  </Box>

                  <Box w={"100%"}>
                    <label
                      className={classes.labelFelid}
                      htmlFor="subscriptionMonth">
                      {t("Vodafone.subscriptionMonth")}
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
                      id="subscriptionMonth"
                      name="subscriptionMonth"
                      className={classes.inputFiledSelect}>
                      <option defaultValue="year" disabled hidden>
                        {t("Vodafone.subscriptionMonth")}
                      </option>
                      <option value="1">1</option>
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
                    <Text>150 Egyptian Pounds</Text>
                  </Box>

                  <Box w={"100%"}>
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
                      className={classes.inputFiled}
                    />
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
              01234567891
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
