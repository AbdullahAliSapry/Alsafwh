/* eslint-disable react-hooks/rules-of-hooks */
import {
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  useComputedColorScheme,
  Box,
  Text,
} from "@mantine/core";

import classes from "./ContactForm.module.css";
import { useFormik } from "formik";
import { ContactSchema } from "@schemas/PublicSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/Store";
import { SendProblemApi } from "@store/api/ProblemApi";
import { IProblem } from "@utilities/interfaces/PublicInterfce";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
      phone: "",
    },
    validationSchema: ContactSchema(),
    onSubmit: (values: IProblem) => {
      dispatch(SendProblemApi(values));
      formik.resetForm();
    },
  });

  const BoxShadow = () => {
    return computedColorScheme === "light"
      ? ""
      : "rgba(255, 255, 255, 0.2) 0px 2px 8px 0px";
  };

  const col = () => {
    return computedColorScheme === "light" ? "" : "rgb(36,36,36)";
  };

  return (
    <Box
      bg={col()}
      style={{ boxShadow: BoxShadow() }}
      className={classes.wrapper}>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={50}>
          <Box
            className={`${classes.form} ${
              computedColorScheme === "dark" ? classes.formDark : ""
            }`}>
            <div className={classes.ParentToInputs}>
              <div>
                <TextInput
                  label={t("contactForm.email")}
                  placeholder={t("contactForm.emailPlaceholder")}
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  mt={16}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Text c="red">{formik.errors.email}</Text>
                ) : null}
              </div>
              <div>
                <TextInput
                  label={t("contactForm.name")}
                  placeholder={t("contactForm.namePlaceholder")}
                  mt="md"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                {formik.touched.name && formik.errors.name ? (
                  <Text c="red">{formik.errors.name}</Text>
                ) : null}
              </div>
              <div>
                <TextInput
                  label={t("contactForm.phone")}
                  placeholder={t("contactForm.phonePlaceholder")}
                  mt="md"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <Text c="red">{formik.errors.phone}</Text>
                ) : null}
              </div>
            </div>
            <Textarea
              required
              label={t("contactForm.description")}
              placeholder={t("contactForm.descriptionPlaceholder")}
              rows={7}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            {formik.touched.description && formik.errors.description ? (
              <Text c="red">{formik.errors.description}</Text>
            ) : null}
            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control}>
                {t("contactForm.submitButton")}
              </Button>
            </Group>
          </Box>
        </SimpleGrid>
      </form>
    </Box>
  );
}
