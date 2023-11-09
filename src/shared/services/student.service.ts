import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStudent } from '../models/interfaces/Student';
import { API_URL } from '../constants/api.constants';
import { IAttendance } from '../models/interfaces/Attendance';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students : BehaviorSubject<IStudent[]> = new BehaviorSubject<IStudent[]>([]);
  student: BehaviorSubject<IStudent | null> = new BehaviorSubject<IStudent | null>(null);

  constructor(private http: HttpClient) { }

  fetchAllStudents() {
    this.students.next([]);
    this.http.get<IStudent[]>(`${API_URL}/student`)
    .subscribe({
      next: res => {
        this.students.next(res);
      },
      error: err => console.log('error', err)
    })
  }

  fetchStudentById(studentId: string) {
    this.student.next(null);
    this.http.get<IStudent>(`${API_URL}/student/${studentId}`)
    .subscribe({
      next: res => {
        this.student.next(res);
      },
      error: err => console.log(err)
    })
  }

  addStudent(student: IStudent) : Observable<IStudent> {
    return this.http.post<IStudent>(`${API_URL}/student/add`, student);
  }

  updateStudent(student: IStudent) : Observable<IStudent> {
    return this.http.put<IStudent>(`${API_URL}/student/update`, student);
  }

  deleteStudent(studentId: string) : Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}/student/delete/${studentId}`);
  }

  markAttendance(rollNo: string, attendanceRecord: IAttendance) : Observable<IStudent> {
    return this.http.post<IStudent>(`${API_URL}/student/mark/${rollNo}`, attendanceRecord);
  }
}
