import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  data: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.data = db.object('ru').valueChanges();
    // this.data.subscribe(response => console.log(response));
  }

  getExperience(){
    return this.db.list('ru/experience').valueChanges();
  }
}
