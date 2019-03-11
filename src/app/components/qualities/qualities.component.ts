/// <reference path="./qualities.d.ts" />

import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-qualities',
  templateUrl: './qualities.component.html',
  styleUrls: ['./qualities.component.scss']
})
export class QualitiesComponent {

  qualities: Quality[];
  qualitiesObserver: any;

  constructor(private _fetch: FetchService) {
    this.qualitiesObserver = this._fetch.getQualities().subscribe((snapshot: Quality[]) => this.qualities = snapshot);
  }

  ngOnDestroy() {
    this.qualitiesObserver.unsubscribe();
  }

}
