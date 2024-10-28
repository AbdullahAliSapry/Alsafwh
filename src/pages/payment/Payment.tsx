import { useEffect, useState } from "react";
import { Stack, Text, Box, useComputedColorScheme } from "@mantine/core";
import classes from "./Payment.module.css";
import Vodafone from "./component/vodafone/Vodafone";
import PaymentForm from "./component/paymentForm/PaymentForm";
import { useNavigate, useParams } from "react-router-dom";
import { GetSubscriptionApi } from "@store/api/SubscriptionApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { toast } from "react-toastify";

const mockdata = [
  { label: "فودافون", Component: <Vodafone /> },
  { label: "payment", Component: <PaymentForm /> },
];

export function Payment() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { plan } = useSelector((state: RootState) => state.Subscription);

  useEffect(() => {
    if (id) {
      dispatch(GetSubscriptionApi(Number.parseInt(id)));
    }
  }, [dispatch, id]);
  const navigate = useNavigate();  
  useEffect(() => {
    if (plan?.typeSubscription === 1 || plan?.typeSubscription ===2) {
      toast.info("قريبا ان شاء الله");
      navigate("/");
      return;
    }
  }, [dispatch, id, navigate, plan]);

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
