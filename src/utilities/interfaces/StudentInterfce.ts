import { IFile, IUser, IYear } from "./PublicInterfce";

export interface IStudent {
  id: number;
  file: IFile | null;
  location: string;
  specialization: string;
  user: IUser;
  fatherPhone: string;
  year: IYear;
}
