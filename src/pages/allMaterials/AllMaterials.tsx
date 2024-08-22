/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Container,
  Grid,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import classes from "./AllMaterials.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetAllSubjectApi } from "@store/api/SubjectApi";
export default function AllMaterials() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { subjects } = useSelector((state: RootState) => state.Subject);
  const dispatch = useDispatch<AppDispatch>();
  const col = () => {
    if (computedColorScheme == "light") {
      return "rgb(18,18,18)";
    } else {
      return "white";
    }
  };

  useEffect(() => {
    if (subjects.length > 0) return;
    dispatch(GetAllSubjectApi());
  }, [subjects, dispatch]);
  return (
    <Box>
      <Box mb={50} className={classes.headerPageTeacher}>
        <Text my={20} fz={30} c={"#003EDD"}>
          المعليمن{" "}
        </Text>

        <Text my={20} fz={30} c={"white"}>
          هم صناع الاجيال و بناة المستقبل
        </Text>
      </Box>

      <Box mb={50}>
        <Container>
          <Text my={50} fw={700} fz={25} c={"#003EDD"}>
            المواد المتاحة على المنصة
          </Text>
          <Grid gutter={"xl"}>
            {subjects.map((ele) => {
              return (
                <Grid.Col key={ele.id} span={{ base: 12, md: 6, lg: 3 }}>
                  <Link
                    to={`/single-material/${ele.id}`}
                    style={{ textDecoration: "none" }}>
                    <Box>
                      <Box
                        px={25}
                        pt={20}
                        display={"grid"}
                        style={{
                          justifyContent: "center",
                          borderRadius: "10px",
                        }}>
                        <Text ta={"center"} c={"black"} mr={0} mt={10}>
                          {ele.description}
                        </Text>
                        <img
                          src={ele.fileUploads.url}
                          width={"100%"}
                          height={"auto"}
                          alt=""
                        />
                      </Box>

                      <Box mt={20}>
                        <Text c={col()} ta={"center"}>
                          {ele.name}
                        </Text>
                      </Box>
                    </Box>
                  </Link>
                </Grid.Col>
              );
            })}
          </Grid>
          {/* <Box mt={50} display={"flex"} style={{ justifyContent: "center" }}>
            <Pagination total={5} siblings={1} defaultValue={1} />
          </Box>{" "} */}
        </Container>
      </Box>
    </Box>
  );
}
