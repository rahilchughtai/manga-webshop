import { Component, Input, OnInit } from '@angular/core';

import { MangaComment } from 'src/app/shared/models/comment.model';

@Component({
  selector: 'manga-detail-user-comment',
  template: `
    <div>
      <p>
        {{ comment.userData.displayName }} <br />
        {{ comment.text }}
      </p>
    </div>
  `,
  styles: [
    `
      p {
        padding: 1em;
        width: 50vw;
        word-break: break-word;
      }
    `,
  ],
})
export class UserCommentComponent implements OnInit {
  constructor() {}

  @Input() comment!: MangaComment;
  ngOnInit(): void {}
}
