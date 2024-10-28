import {
  IFeedBackCourse,
  IStudentCourseProgressDto,
  ISubject,
  ITeacher,
  IYear,
} from "./PublicInterfce";
export interface ICourse {
  description: string;
  evalution: number;
  id: string;
  imgUrl: string;
  isFree: boolean;
  startDate: string;
  subject: ISubject | null;
  subjectId: string;
  teacherId: number;
  title: string;
  trailerVideo: string;
  year: IYear;
  teacher: ITeacher;
  learningOutcomes: string;
  createAt: string;
  subTitle: string;
  price: number;
  studentCourseProgress?: IStudentCourseProgressDto;
  coursesFeedBacks?: IFeedBackCourse[];
  branch:string;
}
