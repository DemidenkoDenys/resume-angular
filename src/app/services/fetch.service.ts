import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(public db: AngularFireDatabase){}

  getFilters() : Observable<{}> {
    return this.db.object('filters').valueChanges();
  }
  getPortfolio() : Observable<{}> {
    return this.db.list('portfolio', ref => ref.orderByChild('show')).valueChanges();
  }
  getInterests() : Observable<{}> {
    return this.db.list('interests', ref => ref.orderByChild('show')).valueChanges();
  }
  getExperience() : Observable<{}> {
    return this.db.list('experience').valueChanges();
  }
  getSkills() : Observable<{}> {
    return this.db.object('skills').valueChanges();
  }
  getSkillsPriority() : Observable<{}> {
    return this.db.list('skills-priority').valueChanges();
  }
  getImages() : Observable<{}> {
    return this.db.object('images').valueChanges();
  }
  getQualities() : Observable<{}> {
    return this.db.list('qualities').valueChanges();
  }
}
