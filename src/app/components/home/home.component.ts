import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/course.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {Like} from '../../models/like';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postList: Array<Post>;
  errorMessage: string;
  infoMessage: string;
  currentUser: User;

  constructor(private userService: UserService, private postService: PostService, private router: Router) {
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit() {
    this.findAllPosts();
  }

  findAllPosts() {
    this.postService.findAllPosts().subscribe(data => {
      this.postList = data;
    });
  }

  like(post: Post) {
    if (!this.currentUser) {
      this.errorMessage = 'You should sign in to like this post';
      return;
    }
    const like = new Like();
    like.userId = this.currentUser.id;
    like.post = post;

    this.postService.enroll(like).subscribe(data => {
      this.infoMessage = 'Mission is completed.';
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
    });
  }

  detail(course: Post) {
    localStorage.setItem('currentPost', JSON.stringify(Post));
    this.router.navigate(['/detail', course.id]);
  }
}
