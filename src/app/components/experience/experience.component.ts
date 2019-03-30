/// <reference path="./experience.d.ts" />

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent{

  experiences$: Observable<{}>;
  upperCounter: number = 0;

  constructor(private _fetch: FetchService) {
    this.experiences$ = this._fetch.getExperience();
  }
}
