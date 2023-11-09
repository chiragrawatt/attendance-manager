import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormData } from 'src/shared/models/interfaces/FormData';
import { IStudent } from 'src/shared/models/interfaces/Student';
import { StudentService } from 'src/shared/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  @Input() formData! : IFormData;
  @Input() handleSubmit!: (student: IStudent) => void;
  studentForm: FormGroup = this.fb.group({});
  students: IStudent[] | null = null

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: [this.formData.student?.name, [Validators.required]],
      rollNo: [{value: this.formData.student?.rollNo, disabled: this.formData.isUpdate}, [Validators.required, Validators.pattern(/^\d{3}$/), this.rollNumberValidator()]],
      email: [this.formData.student?.email, [Validators.required, Validators.email]],
      phone: [this.formData.student?.phone, [Validators.required, Validators.pattern(/^\d{10}$/)]]
    })

    this.studentService.students.subscribe({
      next: res => {
        this.students = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  
  onSubmit() {
    let studentData : IStudent = this.studentForm.getRawValue();
    studentData['attendanceRecord'] = [];
    if(this.formData.student?.studentId != undefined)
    studentData['studentId'] = this.formData.student?.studentId;
    this.handleSubmit(studentData);
  }

  rollNumberValidator() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      let input = new String(control.value);
      let idx = this.students?.findIndex(student => student.rollNo == input);
      console.log(idx);
      if(idx === -1 || this.formData.isUpdate) {
        return null;
      }
      return {invalidRoll: true}
    }
  }
}
