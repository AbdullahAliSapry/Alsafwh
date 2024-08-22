import image from "../../assets/Alsafwa/person.png";
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
