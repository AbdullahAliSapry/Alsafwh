import { Box, Text } from "@mantine/core";
import Styles from "./HeaderTeacher.module.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import { UpdateImgApi } from "@store/api/StudentApi";
import { IoImages } from "react-icons/io5";
import Spinner from "@shared/spineer/Spinner";
import { UpdateImgApiTeacher } from "@store/api/TeacherApi";
import { useTranslation } from "react-i18next";

const color = "rgb(34,166,241)";
export default function HeaderTeacher({
  image,
  name,
  subject,
  userId,
  publicId,
}: {
  image: string;
  name: string;
  subject: string;
  userId: string;
  publicId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.Student);
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const formik = useFormik({
    initialValues: {
      image: null as File | null,
    },
    onSubmit: (values) => {
      if (!values.image) {
        toast.error("يجب اختيار صوره");
        return;
      }
      const data = new FormData();
      data.append("file", values.image);
      if (AuthModel?.roles[0] === "Student") {
        dispatch(UpdateImgApi(userId, publicId, data));
      } else if (AuthModel?.roles[0] === "Teacher") {
        dispatch(UpdateImgApiTeacher(userId, publicId, data));
      }
    },
  });


  const { t, i18n } = useTranslation();
  return (
    <div>
      {loading && <Spinner />}
      <div
        className={Styles.mainInfo}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <form className={Styles.ConInputs} onSubmit={formik.handleSubmit}>
          <div>
            <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className={Styles.containerImage}>
                <img
                  className={Styles.Img}
                  src={
                    formik.values.image
                      ? URL.createObjectURL(formik.values.image)
                      : image
                  }
                  alt=""
                />
                <label htmlFor="ImgEdit" className={Styles.lapelImg}>
                  <IoImages />
                </label>
              </div>
              <Box>
                <Text fw={700} fz={18} style={{ color }}>
                  {name}
                </Text>
                <Text fz={15} fw={400} mt={8}>
                  {subject}
                </Text>
              </Box>
            </Box>
          </div>
          <input
            type="file"
            id="ImgEdit"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                formik.setFieldValue("image", e.target.files[0]);
              }
            }}
            className={Styles.inputImg}
          />
          <button type="submit" className={Styles.btnsend}>
            {t("HeaderTeacher.btn")}
          </button>
        </form>
      </div>
    </div>
  );
}
