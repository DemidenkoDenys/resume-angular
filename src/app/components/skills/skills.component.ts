/// <reference path="./skills.d.ts" />

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  data: Observable<{}>;

  constructor(private _fetch: FetchService) {
    this.data = this._fetch.getData();
  }

}
