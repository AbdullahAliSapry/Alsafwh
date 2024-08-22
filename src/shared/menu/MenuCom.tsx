import { Badge, Menu, rem } from "@mantine/core";
import {
  IconSettings,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
} from "@tabler/icons-react";
import Styles from "./MenuCom.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { RiLogoutCircleLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { LogOut } from "@store/api/AuthApi";
import { PiStudentFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";

export default function MenuCom({ img }: { img: string }) {
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const studentData = useSelector((state: RootState) => state.Student);
  const teacherData = useSelector((state: RootState) => state.Teacher);

  const student =
    AuthModel?.roles[0] === "Student" ? studentData?.student : null;
  const teacher =
    AuthModel?.roles[0] !== "Student" ? teacherData?.teacher : null;

  const { numNotReadings } = useSelector(
    (state: RootState) => state.Notification
  );

  const { t,i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: t("Menu.confirmLogout"),
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Menu.confirmButton"),
      cancelButtonText: t("Menu.cancelButton"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(LogOut(i18n.language));
        navigate("/login");
      }
    });
  };

  const imageUrl = student
    ? student?.user.fileUploads?.url
    : teacher?.user.fileUploads?.url || img;

  return (
    <Menu
      shadow="md"
      width={200}
      transitionProps={{ transition: "rotate-right", duration: 150 }}>
      <Menu.Target>
        <div className={Styles.conImg}>
          <img src={imageUrl} alt="" />
        </div>
      </Menu.Target>

      <Menu.Dropdown className={Styles.MenuDropDown}>
        <Menu.Label>{t("Menu.label")}</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }>
          <Link
            to={
              AuthModel?.roles[0] === "Student"
                ? `/student-page/${AuthModel?.userId}`
                : `/teacher-profile/${AuthModel?.userId}`
            }
            className={Styles.LinkStyle}>
            {t("Menu.settings")}
          </Link>
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Link
              to={`/messages/${AuthModel?.userId}`}
              className={Styles.LinkStyle}>
              {t("Menu.messages")}
            </Link>
            <Badge size="sm" circle>
              {numNotReadings}
            </Badge>
          </div>
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }>
          {t("Menu.photos")}
        </Menu.Item>
        {AuthModel?.roles[0] === "Student" && (
          <Menu.Item
            leftSection={
              <PiStudentFill style={{ width: rem(14), height: rem(14) }} />
            }>
            <Link
              to={`/courses-student/${AuthModel?.userId}`}
              className={Styles.LinkStyle}>
              {t("Menu.courses")}
            </Link>
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Label>{t("Menu.label")}</Menu.Label>
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }>
          {t("Menu.deleteAccount")}
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={() => {
            handleLogout();
          }}
          leftSection={
            <RiLogoutCircleLine style={{ width: rem(14), height: rem(14) }} />
          }>
          {t("Menu.logout")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
