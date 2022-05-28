import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentsService } from 'src/app/shared/services/comment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'manga-detail-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() mangaId = -1;

  commentText = '';

  constructor(
    private commentService: CommentsService,
    public authService: AuthService
  ) {}

  userComments$!: Observable<any>;
  ngOnInit(): void {
    this.userComments$ = this.commentService.getCommentsByManga(this.mangaId);
  }

  postComment() {
    this.commentService.addComment(
      this.mangaId,
      this.commentText,
      this.authService.getStorageUserData()
    );
  }
}
