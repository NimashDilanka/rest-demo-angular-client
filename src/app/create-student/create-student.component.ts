import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {StudentService} from '../service/student.service';
import {Student} from '../model/student';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {
  id = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);

  constructor(private studentService: StudentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  save() {
    const s = new Student();
    s.id = +this.id.value;
    s.name = this.name.value;
    s.age = +this.age.value;
    s.email = this.email.value;
    this.studentService.add(s).pipe(
      catchError(err => {
        this.snackBar.open('error in save action !!');
        return EMPTY;
      })
    ).subscribe(res => {
      if (res !== undefined) {
        this.snackBar.open('save action is successful');
      }
    });
  }
}
