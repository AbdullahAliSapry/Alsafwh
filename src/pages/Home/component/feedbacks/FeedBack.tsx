import { Container } from "@mantine/core";
import TitleSection from "@shared/titlesction/TitleSection";
import styles from "./FeedBack.module.css";
import Button from "@shared/Button/Button";
import { IFeedBack } from "@utilities/interfaces/PublicInterfce";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const { parentDiv } = styles;

export default function FeedBack({ feedbacks }: { feedbacks: IFeedBack[] }) {
  const profiles = [
    {
      top: "6%",
      left: "30%",
      borderColor: "green",
    },
    {
      top: "40%",
      left: "50%",
      borderColor: "blue",
    },
    {
      top: "41%",
      left: "20%",
      borderColor: "red",
    },
    {
      top: "10%",
      left: "70%",
      borderColor: "yellow",
    },
  ];
  const [isFading, setIsFading] = useState(false);

  const [data, setData] = useState<IFeedBack>(feedbacks[0]);
  const { t, i18n } = useTranslation();

  const handleClick = (feedback: IFeedBack) => {
    setIsFading(true);
    setTimeout(() => {
      setData(feedback);
      setIsFading(false);
    }, 500);
  };

  useEffect(() => {
    if (feedbacks[0] != null) {
      setData(feedbacks[0]);
    }
  }, [feedbacks]);

  return (
    <>
      {feedbacks.length > 0 ? (
        <>
          <div
            style={{ marginTop: "200px" }}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <TitleSection title={t("FeedBack.title")} />
            <Container className={parentDiv}>
              <div className={styles.mapContainer}>
                {feedbacks.slice(0, 4).map((profile, index) => (
                  <div
                    key={index}
                    className={styles.profilePic}
                    onClick={() => handleClick(profile)}
                    style={{
                      top: profiles[index].top,
                      left: profiles[index].left,
                      borderColor: profiles[index].borderColor,
                    }}>
                    <img src={profile.imgUrl} alt={t("FeedBack.profileAlt")} />
                  </div>
                ))}
                <div
                  className={`${styles.cardContainer} ${
                    isFading ? styles.fadeOut : styles.fadeIn
                  }`}>
                  <div className={styles.card}>
                    <p className={styles.cardText}>{data?.text}</p>
                    <div className={styles.cardLines}>
                      <div
                        className={styles.line}
                        style={{ background: "#FF0000" }}></div>
                      <div
                        className={styles.line}
                        style={{ background: "#FFA500" }}></div>
                      <div
                        className={styles.line}
                        style={{ background: "#FF0000" }}></div>
                    </div>
                    <div className={styles.cardProfile}>
                      <img
                        src={data?.imgUrl}
                        alt={t("FeedBack.profileAlt")}
                        className={styles.cardProfileImage}
                      />
                      <p className={styles.cardProfileName}>{data?.name}</p>
                    </div>
                    <div className={styles.cardLines}>
                      <div
                        className={styles.line}
                        style={{ background: "#FF0000" }}></div>
                      <div
                        className={styles.line}
                        style={{ background: "#FFA500" }}></div>
                      <div
                        className={styles.line}
                        style={{ background: "#FF0000" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <Button
            route="/all-feedback"
            text={t("FeedBack.allFeedbackButton")}
          />
        </>
      ) : (
        <>
          {t("FeedBack.noFeedbacks")}
          <Button
            route="/all-feedback"
            text={t("FeedBack.allFeedbackButton")}
          />
        </>
      )}
    </>
  );
}
