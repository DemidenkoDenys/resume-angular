import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FetchService {


  constructor(public db: AngularFireDatabase){}

  getData() {
    return this.db.object('ru').valueChanges();
  }

  getFilters() {
    return this.db.object('filters').valueChanges();
  }

  getPortfolio() {
    return this.db.list('portfolio', ref => ref.orderByChild('show'));
  }

  getInterests() {
    return this.db.list('ru/interests', ref => ref.orderByChild('show'));
  }

}
