import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  postId: number;
  currentPost: Post;
  studentList: Array<string>;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.currentPost = JSON.parse(localStorage.getItem('currentCourse'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        // tslint:disable-next-line:radix
        this.postId = Number.parseInt(params.get('id'));
        this.findStudentsOfCourse();
      }
    });
  }

  findStudentsOfCourse() {
    this.postService.findStudentsOfCourse(this.postId).subscribe(data => {
      this.studentList = data;
    });
  }

}
