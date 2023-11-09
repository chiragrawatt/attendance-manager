import { IStudent } from "./Student";

export interface IFormData {
    title: string,
    subtitle: string,
    isUpdate: boolean,
    student: IStudent | null,
    buttonText: string
}