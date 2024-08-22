import { Box, Grid, Text, useComputedColorScheme } from "@mantine/core";
import classes from "../AllTeacher.module.css";
import teacherImg from "@assets/Alsafwa/Retrato Corporativo _ Foto para LinkedIn _ Perfil Profissional _ São Paulo_BR.png";
import { ITeacher } from "@utilities/interfaces/PublicInterfce";
import { useState } from "react";

export default function TeacherCard({
  teacher,
  bg,
}: {
  teacher: ITeacher;
  bg: string;
}) {
  const [imageSrc, setImageSrc] = useState(
    teacher.user.fileUploads.url || teacherImg
  );
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const handleImageError = (event: { currentTarget: { src: string } }) => {
    if (event.currentTarget.src !== teacherImg) {
      setImageSrc(teacherImg);
    }
  };
  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
      <div className={classes.card}>
        <Box style={{ borderRadius: "15px" }} bg={bg}>
          <img
            src={imageSrc}
            className={classes.card_img_top}
            onError={handleImageError}
            alt="Teacher Image"
          />
        </Box>
        <div className="card-body">
          <Text
            fz={14}
            fw={700}
            ta={"start"}
            className={
              computedColorScheme == "light"
                ? classes.card_titleLight
                : classes.card_titleDark
            }>
            {teacher.user.firstName + " " + teacher.user.lastName}
          </Text>
          <Text
            fz={14}
            fw={300}
            ta={"start"}
            mt={10}
            className={
              computedColorScheme == "light"
                ? classes.card_textLight
                : classes.card_textDark
            }>
            {teacher.description}
          </Text>
        </div>
      </div>
    </Grid.Col>
  );
}
