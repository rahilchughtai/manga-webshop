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
  styles: [],
})
export class UserCommentComponent implements OnInit {
  constructor() {}

  @Input() comment: any;
  ngOnInit(): void {}
}
