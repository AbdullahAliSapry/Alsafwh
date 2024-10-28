import image from "../../assets/Alsafwa/teacher.png";
import classes from "./FeedbackCourse.module.css";
export default function DataPerson({
  ImgUrl,
  Name,
}: {
  ImgUrl: string;
  Name: string;
}) {
  return (
    <div className={classes.parentPersonData}>
      <div className={classes.conToImage}>
        <img src={ImgUrl || image} alt="" />
      </div>
      <p>{Name}</p>
    </div>
  );
}
