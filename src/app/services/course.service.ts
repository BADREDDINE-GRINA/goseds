import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {Like} from '../models/like';

let API_URL = "http://localhost:8765/api/course/service/";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  enroll(transaction: Like): Observable<any> {
    return this.http.post(API_URL + 'enroll', JSON.stringify(transaction),
    {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findAllPosts(): Observable<any> {
    return this.http.get(API_URL + "all",{headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findTransactionsOfUser(userId: number): Observable<any> {
    return this.http.get(API_URL + "user/" + userId, {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findStudentsOfCourse(postId: number): Observable<any> {
    return this.http.get(API_URL + "course/" + postId, {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
}
