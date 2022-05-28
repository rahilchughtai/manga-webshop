import { Timestamp, orderBy } from 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { MangaComment } from '../models/comment.model';
import { MangaUser } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private afs: AngularFirestore) {}

  addComment(id: number, text: string, userData: MangaUser | null) {
    this.afs
      .collection('manga-comments')
      .add({ id, text, userData, timestamp: Timestamp.now() });
  }

  getCollectionById(id: number) {
    return this.afs.collection('manga-comments', (ref) =>
      ref.where('id', '==', id).orderBy('timestamp', 'desc')
    );
  }

  getCommentsByManga(id: number) {
    return this.getCollectionById(id).valueChanges() as Observable<
      MangaComment[]
    >;
  }

  deleteAllById(id: number) {}
}
