import { Box, Text } from "@mantine/core";
import Styles from "./HeaderLesson.module.css";

const color = "rgb(34,166,241)";

export default function HeaderLesson({
  name,
  img,
  title,
}: {
  name: string;
  img: string;
  title: string;
}) {
  return (
    <div className={Styles.parent}>
      <Box
        className={Styles.numberOfCourses}
        display={"flex"}
        style={{ alignItems: "center", gap: "1rem" , flexWrap:"wrap" , alignSelf:"center" }}
      >
        <Text fw={700} fz={18} c={color}>
          {name}
        </Text>
        <Box
          pt={15}
          pb={5}
          px={30}
          display={"grid"}
          style={{
            borderRadius: "15px",
          }}
          bg={"rgba(198, 215, 255, 1)"}
        >
          <Text fz={15} fw={500} c={"black"}>
            {title}
          </Text>
          <Box ta={"center"}>
            <img src={img} width={"auto"} height={"90px"} />
          </Box>
        </Box>
      </Box>

      {/* </div> */}
    </div>
  );
}
