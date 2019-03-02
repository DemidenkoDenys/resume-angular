import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(public db: AngularFireDatabase) {}

  getData() {
    return this.db.object('ru').valueChanges();
  }
}
