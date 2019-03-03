/// <reference path="./experience.d.ts" />

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent{

  data: Observable<any>;
  experiences: Observable<any>;
  upperCounter: number = 0;

  constructor(private _fetch: FetchService) {
    this.data = this._fetch.getData();
    this.experiences = this._fetch.getExperience().valueChanges();
  }
}
