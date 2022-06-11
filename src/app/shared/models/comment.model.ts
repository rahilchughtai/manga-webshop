import { MangaUser } from './user.model';
import { Timestamp } from 'firebase/firestore';

export interface MangaComment {
  text: string;
  id: number;
  timestamp: Timestamp;
  userData: MangaUser;
}
