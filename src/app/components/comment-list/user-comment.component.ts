import { Component, Input, OnInit } from '@angular/core';

import { MangaComment } from 'src/app/shared/models/comment.model';

@Component({
  selector: 'manga-detail-user-comment',
  template: `
    <div>
      <p>
        <span>{{ comment.userData.displayName }}</span> <br />
        {{ comment.text }}
      </p>
    </div>
  `,
  styles: [
    `
      @use "../../shared/styles/customvars" as *;
      p {
        background-color: $main_color_dark;
        padding: 1em;
        width: 50vw;
        min-width: 250px;
        word-break: break-word;

        border-radius: 5px;
      }
      span  {
        opacity: 0.8;
      }
    `,
  ],
})
export class UserCommentComponent implements OnInit {
  constructor() {}

  @Input() comment!: MangaComment;
  ngOnInit(): void {}
}
