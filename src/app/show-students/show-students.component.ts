import {Component, OnInit} from '@angular/core';
import {Student} from '../model/student';
import {StudentService} from '../service/student.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.scss']
})
export class ShowStudentsComponent implements OnInit {
  students: Student[];
  name = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required]);
  sort = new FormControl('id:asc', [Validators.required]);
  offset = new FormControl('0', [Validators.required]);
  limit = new FormControl('100', [Validators.required]);

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
  }

  save() {
    this.studentService.findAll
    (this.name.value, this.age.value, this.sort.value, this.limit.value, this.offset.value).subscribe(
      s => this.students = s
    );
  }
}
