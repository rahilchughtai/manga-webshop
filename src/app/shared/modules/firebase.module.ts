import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
  ],
})
export class FirebaseServiceModule {}
