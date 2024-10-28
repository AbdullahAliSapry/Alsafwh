import {
  Box,
  Container,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import Stars from "@shared/Stars/Stars";
import { IFeedBackCourse } from "@utilities/interfaces/PublicInterfce";
import DataPerson from "./DataPerson";
export default function FeedBackCard({
  feedBack,
}: {
  feedBack: IFeedBackCourse;
}) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <div>
      <Container
        mt={40}
        px={40}
        pb={20}
        pt={40}
        w={"fit-content"}
        bg={computedColorScheme == "light" ? "white" : "rgb(36,36,36)"}
        style={{ borderRadius: "15px", width: "fit-content" }}>
        <Text
          pb={20}
          mb={10}
          c={"rgba(34, 166, 241, 1)"}
          fz={20}
          fw={500}
          ta={"start"}>
          تقييم الكورس
        </Text>
        <div>
          <DataPerson
            ImgUrl={feedBack.user.fileUploads.url}
            Name={feedBack?.user?.firstName + " " + feedBack?.user?.lastName}
          />
        </div>
        <Text fz={14}>{feedBack.description}</Text>

        <Box ta={"center"}>
          <Text c={"gold"} fw={700} fz={50}>
            {feedBack?.rate}
          </Text>
          <Box
            mb={20}
            display={"flex"}
            style={{ gap: "4px", justifyContent: "center" }}>
            <Stars num={feedBack?.rate} />
          </Box>
        </Box>
        <Box
          mt={50}
          display={"flex"}
          style={{
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
        </Box>
      </Container>
    </div>
  );
}
