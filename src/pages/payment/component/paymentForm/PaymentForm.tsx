import {
  Box,
  Container,
  Input,
  Text,
  useComputedColorScheme,
  Button,
} from "@mantine/core";
import classes from "./PaymentForm.module.css";
import { IconCaretLeftFilled, IconChevronDown } from "@tabler/icons-react";
import image from "@assets/Alsafwa/images-visa-removebg-preview.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { GetSubscriptionApi } from "@store/api/SubscriptionApi";
import { useFormik } from "formik";
import { GetAllMonthsApi } from "@store/api/YearApi";
import { useEffect } from "react";
import { PayMentSchema } from "@schemas/PublicSchema";
import { IPayMentSendingData } from "@utilities/interfaces/PublicInterfce";
import { CreatePayMentApi } from "@store/api/PayMentApi";
import { GetStudentApi } from "@store/api/StudentApi";
import { toast } from "react-toastify";

export default function PaymentForm() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const col = () => {
    return computedColorScheme === "light"
      ? "rgba(226, 230, 238, 1)"
      : "rgb(18,18,18)";
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { plan } = useSelector((state: RootState) => state.Subscription);
  const { months } = useSelector((state: RootState) => state.Year);
  const { authTokenPayMent } = useSelector((state: RootState) => state.Payment);
  const { student } = useSelector((state: RootState) => state.Student);
  const { AuthModel } = useSelector((state: RootState) => state.Auth);

  useEffect(() => {
    if (id) {
      dispatch(GetSubscriptionApi(Number.parseInt(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(GetAllMonthsApi());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      subscriptionMonth: "",
      discountCoupon: "",
      typeSubscription: plan?.typeSubscription?.toString() || "",
      price: plan?.price || "",
      name: plan?.name || "",
    },
    validationSchema: PayMentSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      if (!student?.id || !plan?.id) return;
      const contentMonthIds: string[] = [];
      contentMonthIds.push(values.subscriptionMonth);
      const PayMentData: IPayMentSendingData = {
        studentId: student?.id,
        payMent: {
          AmountCents: values.price ? values.price * 100 : 0,
          City: student.location,
          Email: student.user.email,
          FirstName: student.user.firstName,
          Phone: student.user.phone,
          LastName: student.user.lastName,
          Cuur: "EGP",
          planId: plan?.id,
          contentMonthIds,
        },
      };

      dispatch(CreatePayMentApi(PayMentData));
    },
  });

  useEffect(() => {
    if (plan) {
      formik.setValues({
        ...formik.values,
        typeSubscription: plan.typeSubscription?.toString() || "",
        price: plan.price || 0,
        name: plan.name || "",
      });
    }
  }, [plan]);

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    formik.setFieldValue("discountCoupon", value);

    if (value && plan?.coupons?.[0]?.couponText === value) {
      const discount = plan.price * (plan.coupons[0].couponPercntage / 100);
      const newPrice = plan.price - discount;
      formik.setFieldValue("price", newPrice);
      toast.success("Coupon applied successfully!");
    } else if (value) {
      toast.info("Your coupon is invalid");
    } else {
      formik.setFieldValue("price", plan?.price);
    }
  };

  useEffect(() => {
    if (authTokenPayMent.length > 0) {
      window.location.href = `https://accept.paymob.com/api/acceptance/iframes/856921?payment_token=${authTokenPayMent}`;
    }
  }, [authTokenPayMent, navigate]);

  return (
    <Box c={computedColorScheme === "light" ? "black" : "white"}>
      <Container mt={50}>
        <Box mb={20} display={"flex"} style={{ alignItems: "center" }}>
          <IconCaretLeftFilled color="rgba(38, 180, 252, 1)" />
          <Text fz={25} fw={700}>
            الاشتراكات
          </Text>
        </Box>
        <Box
          bg={computedColorScheme === "light" ? "#f0f0f0" : ""}
          p={15}
          style={{
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
          }}
          px={15}
          py={50}>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              backgroundColor: "",
              width: "auto",
              padding: "15px 20px",
              borderRadius: "15px",
            }}
            className={classes.formStyle}>
            <Box>
              <Box
                mb={20}
                className={classes.titleForm}
                display={"flex"}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text fw={500}>بطاقة ائتمان</Text>
                <Box>
                  <img src={image} height={"50px"} width={"100px"} alt="" />
                </Box>
              </Box>
              <Box
                mb={15}
                display={"flex"}
                className={classes.handelSubscription}>
                <Box w={"100%"}>
                  <input
                    type="text"
                    name="typeSubscription"
                    value={formik.values.typeSubscription}
                    onChange={formik.handleChange}
                    hidden
                    disabled
                  />
                  <label htmlFor="subscriptionMap">خطة الاشتراك</label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    readOnly
                    disabled
                    onChange={formik.handleChange}
                    className={classes.inputFiled}
                    style={{ backgroundColor: col() }}
                  />
                </Box>
                {plan?.typeSubscription !== 1 &&
                  plan?.typeSubscription !== 2 && (
                    <Box w={"100%"}>
                      <label htmlFor="subscriptionMonth">شهر الاشتراك</label>
                      <Input
                        mt={5}
                        px={0}
                        styles={{
                          input: {
                            border: "0px",
                            backgroundColor: col(),
                          },
                        }}
                        component="select"
                        rightSection={
                          <IconChevronDown size={14} stroke={1.5} />
                        }
                        pointer
                        id="subscriptionMonth"
                        name="subscriptionMonth"
                        className={classes.inputFiledSelect}
                        value={formik.values.subscriptionMonth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>
                        {months?.map((month) => (
                          <option key={month.id} value={month.id}>
                            {month.title}
                          </option>
                        ))}
                      </Input>
                      {formik.touched.subscriptionMonth &&
                      formik.errors.subscriptionMonth ? (
                        <Text c={"red"}>{formik.errors.subscriptionMonth}</Text>
                      ) : null}
                    </Box>
                  )}
              </Box>
              <Box
                mb={15}
                display={"flex"}
                className={classes.handelSubscription}>
                <Box w={"100%"}>
                  <label htmlFor="price">المبلغ المراد سداده</label>
                  <br />
                  <input
                    type="text"
                    name="price"
                    value={`${formik.values.price} جنيه مصري`}
                    onChange={formik.handleChange}
                    disabled
                    className={classes.inputFiled}
                    style={{ backgroundColor: col() }}
                  />
                </Box>
                <Box w={"100%"}>
                  <label htmlFor="coupon">كوبون خصم </label>
                  <br />
                  <input
                    id="coupon"
                    name="discountCoupon"
                    type="text"
                    placeholder="كوبون"
                    className={classes.inputFiled}
                    style={{ backgroundColor: col() }}
                    value={formik.values.discountCoupon}
                    onChange={handleCouponChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.discountCoupon &&
                  formik.errors.discountCoupon ? (
                    <div className={classes.errorText}>
                      {formik.errors.discountCoupon}
                    </div>
                  ) : null}
                </Box>
              </Box>
              <Box
                mt={25}
                w={"100%"}
                px={20}
                display={"flex"}
                style={{ justifyContent: "center" }}>
                <Button type="submit" w={"100%"}>
                  دفع
                </Button>
              </Box>
              <Box
                mt={15}
                display={"flex"}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Text c="dimmed" fz="lg">
                    العودة إلى الصفحة الرئيسية
                  </Text>
                </Link>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
