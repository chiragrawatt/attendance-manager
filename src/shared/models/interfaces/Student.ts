import { IAttendance } from "./Attendance";

export interface IStudent {
    studentId: string,
    rollNo: string,
    name: string,
    email: string,
    phone: string
    attendanceRecord: IAttendance[]
}