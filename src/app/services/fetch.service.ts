import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  //TODO unsubscribing

  constructor(public db: AngularFireDatabase){}

  getFilters() {
    return this.db.object('filters').valueChanges();
  }

  getPortfolio() {
    return this.db.list('portfolio', ref => ref.orderByChild('show')).valueChanges();
  }

  getInterests() {
    return this.db.list('interests', ref => ref.orderByChild('show')).valueChanges();
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

  getQualities() {
    return this.db.list('qualities').valueChanges();
  }
}
