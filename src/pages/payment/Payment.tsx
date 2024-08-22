import { useState } from "react";
import { Stack, Text, Box, useComputedColorScheme } from "@mantine/core";
import classes from "./Payment.module.css";
import Vodafone from "./component/vodafone/Vodafone";
import PaymentForm from "./component/paymentForm/PaymentForm";

const mockdata = [
  { label: "فودافون", Component: <Vodafone /> },
  { label: "payment", Component: <PaymentForm /> },
];

export function Payment() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const [active, setActive] = useState(0);

  const content = mockdata[active].Component;

  const links = mockdata.map((link, index) => (
    <Box
      key={index}
      onClick={() => setActive(index)}
      className={
        index === mockdata.length - 1
          ? computedColorScheme === "light"
            ? classes.linkPayment
            : classes.linkPaymentDark
          : computedColorScheme === "light"
          ? classes.link
          : classes.linkDark
      }
      data-active={index === active || undefined}>
      <Text fw={700} py={5}>
        {link.label}
      </Text>
    </Box>
  ));

  return (
    <Box className={classes.parent}>
      <nav
        className={
          active === mockdata.length - 1
            ? classes.secondNavbar
            : computedColorScheme === "light"
            ? classes.navbar
            : classes.navbarDark
        }>
        <div className={classes.navbarMain}>
          <Stack className={classes.styleStack} justify="space-evenly" gap={5}>
            {links}
          </Stack>
        </div>
      </nav>

      <Box mb={50} w={"100%"} h={"100%"}>
        {content}
      </Box>
    </Box>
  );
}
