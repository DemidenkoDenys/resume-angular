import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FetchService {


  constructor(public db: AngularFireDatabase){}

  getFilters() {
    return this.db.object('filters').valueChanges();
  }

  getPortfolio() {
    return this.db.list('portfolio', ref => ref.orderByChild('show')).valueChanges();
  }

  getInterests() {
    return this.db.list('ru/interests', ref => ref.orderByChild('show')).valueChanges();
  }

  getExperience() {
    return this.db.list('experience').valueChanges();
  }

  getSkills() {
    return this.db.object('skills').valueChanges();
  }

  getSkillsPriority() {
    return this.db.list('skills-priority').valueChanges();
  }

  getImages() {
    return this.db.object('images').valueChanges();
  }
}
