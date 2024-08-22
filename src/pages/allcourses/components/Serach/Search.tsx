import { Text, useComputedColorScheme } from "@mantine/core";
import Styles from "./Serach.module.css";
import { BsSearchHeart, BsFillTrashFill } from "react-icons/bs";
import { useFormik } from "formik";
import { FilterSchema } from "@schemas/PublicSchema";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ClearFilter } from "@store/slices/CourseSlice";
import { useEffect } from "react";
import { GetAllYears } from "@store/api/YearApi";
import { AppDispatch, RootState } from "@store/Store";
import { IFilter } from "@utilities/interfaces/PublicInterfce";
import { GetAllCoursesApi } from "@store/api/CourseApi";
import { useTranslation } from "react-i18next"; // Import useTranslation

const { header, conSearch, StyleBtns, formStyle, headerDark, DeleteButton } =
  Styles;

export default function Search() {
  const { t, i18n } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { years } = useSelector((state: RootState) => state.Year);
  const { count } = useSelector((state: RootState) => state.Course);

  const dispatch = useDispatch<AppDispatch>();

  const initialValues: IFilter = {
    Specialization: "",
    Year: "",
    subject: "",
  };
  useEffect(() => {
    dispatch(GetAllYears());
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema: FilterSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values: IFilter) => {
      if (!values.Specialization && !values.subject && !values.Year) {
        toast.warning(t("search.emptyFields")); // Use translation
        return;
      }
      dispatch(GetAllCoursesApi(1, count, values));
    },
  });

  const handleClearFilters = () => {
    if (
      !formik.values.Specialization &&
      !formik.values.subject &&
      !formik.values.Year
    ) {
      toast.warning(t("search.noFilter")); // Use translation
      return;
    }
    toast.info(t("search.filterCleared")); // Use translation
    formik.resetForm();
    dispatch(ClearFilter());
  };

  return (
    <div className={computedColorScheme === "light" ? header : headerDark}>
      <form
        className={formStyle}
        onSubmit={formik.handleSubmit}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <div>
          <span>{t("search.yearLabel")}</span>
          <select
            value={formik.values.Year}
            name="Year"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}>
            <option value="" disabled>
              {t("search.yearPlaceholder")}
            </option>
            {years.map((year) => (
              <option key={year.id} value={year.name}>
                {year.name}
              </option>
            ))}
          </select>
          {formik.touched.Year && formik.errors.Year && (
            <Text c="red">{formik.errors.Year}</Text>
          )}
        </div>
        <div>
          <span>{t("search.specializationLabel")}</span>
          <select
            value={formik.values.Specialization}
            name="Specialization"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}>
            <option value="" disabled>
              {t("search.specializationPlaceholder")}
            </option>
            <option value="Literary">{t("search.literary")}</option>
            <option value="Science">{t("search.science")}</option>
            <option value="Mathematical">{t("search.mathematical")}</option>
          </select>
          {formik.touched.Specialization && formik.errors.Specialization && (
            <Text c="red">{formik.errors.Specialization}</Text>
          )}
        </div>
        <div>
          <span>{t("search.subjectLabel")}</span>
          <input
            type="text"
            value={formik.values.subject}
            name="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t("search.subjectPlaceholder")}
          />
          {formik.touched.subject && formik.errors.subject && (
            <Text c="red">{formik.errors.subject}</Text>
          )}
        </div>
        <div className={StyleBtns}>
          <button type="submit" className={conSearch}>
            <BsSearchHeart />
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className={DeleteButton}>
            <BsFillTrashFill />
          </button>
        </div>
      </form>
    </div>
  );
}
