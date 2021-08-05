import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {StudentService} from '../service/student.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Student} from '../model/student';
import {catchError, filter} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-modify-student',
  templateUrl: './modify-student.component.html',
  styleUrls: ['./modify-student.component.scss']
})
export class ModifyStudentComponent implements OnInit {
  id = new FormControl('0', [Validators.required]);
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

  load() {
    this.studentService.find(this.id.value).pipe(
      catchError(err => {
        this.snackBar.open('error in leading student data !!');
        return EMPTY;
      })
    )
      .subscribe(s => {
        this.name.setValue(s?.name);
        this.age.setValue(s?.age);
        this.email.setValue(s?.email);
      });
  }

  modify() {
    const s = new Student();
    s.id = +this.id.value;
    s.name = this.name.value;
    s.age = +this.age.value;
    s.email = this.email.value;
    this.studentService.modify(s).pipe(
      catchError(err => {
        this.snackBar.open('error in modify action !!');
        return EMPTY;
      })
    ).subscribe(res => {
      if (res !== undefined) {
        this.snackBar.open('modify action is successful');
      }
    });
  }
}
