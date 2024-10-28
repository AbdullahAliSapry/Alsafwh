export interface IUser {
  email: string;
  fileUploads: IFile;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  gender: string;
}

export interface IFile {
  publicId: string;
  typeRecourse: number;
  url: string;
  name: string;
}

export interface IFeedBack {
  id: string;
  userId: string;
  text: string;
  isConfirmed: boolean;
  name: string;
  imgUrl: string;
}

export interface IAddFeedBack {
  userId: string;
  text: string;
}

export interface IResetPassword {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export interface ISubject {
  description: string;
  id: string;
  imgId: string;
  name: string;
  branch: string;
  fileUploads: IFile;
}

export interface ITeacher {
  user: IUser;
  description: string;
  yearsofExperience: string;
  id: number;
}

export interface IYear {
  name: string;
  id: string;
}

export interface ILesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  courseId: string;
  dateAdding: string;
  contentPdf: string;
  evalution: number;
  containQuize: boolean;
  quize?: IExam;
}

export interface IComment {
  id: string;
  text: string;
  likes: number;
  userId: string;
  lessionId: string;
  user: IUser;
  createAt: string;
}

export interface IAddComment {
  text: string;
  likes: number;
  userId: string;
  lessionId: string;
}
export interface IFilter {
  Year: string;
  subject: string;
  Specialization: string;
}

export interface INotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  isReading: boolean;
  sending: string;
}

export interface ISubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  typeSubscription: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  coupons?: ICoupon[];
}

export interface IExam {
  id: string;
  title: string;
  description: string;
  lessionID: string;
  quizeTime: number;
  isPubliched: boolean;
  numberQustion: number;
  qustions?: IQustion[];
}

export interface IQustion {
  id: string;
  text: string;
  point: number;
  typeQustion: string;
  quizeId: string;
  img?: IFile;
  answerDtos?: IAnswer[];
  fileUpload?: IFile;
}

export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
}

export interface IProblem {
  name: string;
  description: string;
  email: string;
  phone: string;
}

export interface IMonthContent {
  id: string;
  title: string;
  startDateMonth: Date;
  endDateMonth: Date;
}

export interface IPayMentDto {
  AmountCents: number;
  Email: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  City: string;
  Cuur: string;
  planId: number;
  contentMonthIds: string[];
}

export interface IPayMentSendingData {
  payMent: IPayMentDto;
  studentId: number;
}

export interface IPayMentHandlerData {
  stringHmac: string;
  success: boolean;
  Amount: number;
  orderId: string;
  transactionId: string;
  hmac: string;
}

export interface IQuizSubmit {
  QuestionId: string;
  AnswerId: string;
  StudentId: number;
}

export interface IExamAttemp {
  id: string;
  date: string;
  score: number;
  quizId: string;
  studentId: number;
  allScore: number;
}

export interface IFeedBackCourse {
  id: string;
  courseId: string;
  userId: string;
  description: string;
  isConfirmed: boolean;
  rate: number;
  user: IUser;
}

export interface IStudentCourseProgressDto {
  id: number;
  studentId: number;
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  userId: string;
}

export interface ICoupon {
  id: string;
  couponText: string;
  startDate: Date;
  endDate: Date;
  createAt: Date;
  isRevoked: boolean;
  couponPercntage: number;
  isActive: boolean;
  subscriptionPlanId?: number;
  courseId?: string;
}
