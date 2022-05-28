import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'manga-detail-user-comment',
  template: `
    <div>
      <p>
        {{ comment.user.displayName }} <br />
        {{ comment.text }}
      </p>
    </div>
  `,
  styles: [
    `
      p {
        padding: 1em;
        border: 1px solid blue;
      }
    `,
  ],
})
export class UserCommentComponent implements OnInit {
  constructor() {}

  @Input() comment: any;
  ngOnInit(): void {}
}
