import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUrl = `http://localhost:8080/students`;
  constructor(private http: HttpClient) { }

  public findAll(name: string, age: number, sort: string, limit: number, offset: number): Observable<Student[]> {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('sort', sort);
    params = params.append('age', age.toString());
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());
    return this.http.get<Student[]>(this.studentUrl, {params});
  }

  public find(id: number): Observable<Student> {
    const url = this.studentUrl + `/${id}`;
    return this.http.get<Student>(url);
  }

  public modify(student: Student): Observable<number> {
    const url = this.studentUrl + `/${student.id}`;
    return this.http.put<number>(url, student);
  }

  public add(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentUrl, student);
  }

  public delete(id: number): Observable<void> {
    const url = this.studentUrl + `/${id}`;
    return this.http.delete<void>(url);
  }
}
