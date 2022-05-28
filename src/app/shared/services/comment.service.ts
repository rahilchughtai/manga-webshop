import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { MangaUser } from '../models/user.model';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private afs: AngularFirestore) {}

  addComment(id: number, text: string, user: MangaUser | null) {
    this.afs
      .collection('manga-comments')
      .add({ id, text, user, timestamp: Timestamp.now() });
  }

  getCollectionById(id: number) {
    return this.afs.collection('manga-comments', (ref) =>
      ref.where('id', '==', id)
    );
  }

  getCommentsByManga(id: number) {
    return this.getCollectionById(id).valueChanges();
  }

  deleteAllById(id: number) {}
}
