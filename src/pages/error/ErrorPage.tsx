import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Box,
} from "@mantine/core";
import image from "@assets/404 Error-pana.png";

import classes from "./ErrorPage.module.css";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function ErrorPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
        <Box display={"grid"} style={{justifyContent:"center"}}>

      <Container className={classes.root}>
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
          <Image src={image} className={classes.mobileImage} />
          <div>
            <Title className={classes.title}>...هذا الصفحة غير موجود</Title>
            <Text c="dimmed" size="lg">
              الصفحة التي تحاول فتحها غير موجودة. ربما أخطأت في الكتابة العنوان،
              أو تم نقل الصفحة إلى عنوان URL آخر. إذا كنت تعتقد هذا خطأ في
              الاتصال بالدعم.
            </Text>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}>
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "rgb(34,139,230)" }}
                replace={true}>
                {" "}
                الرجوع للصفجة الرئيسية
              </Link>
            </Button>
          </div>
          <Image src={image} className={classes.desktopImage} />
        </SimpleGrid>
      </Container>

        </Box>
    </motion.div>
  );
}
