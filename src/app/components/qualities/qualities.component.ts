/// <reference path="./qualities.d.ts" />

import { Component, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-qualities',
  templateUrl: './qualities.component.html',
  styleUrls: ['./qualities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QualitiesComponent {

  qualities: Quality[];
  qualitiesObserver: any;

  constructor(private _fetch: FetchService, private cdr: ChangeDetectorRef) {
    this.qualitiesObserver = this._fetch.getQualities().subscribe((snapshot: Quality[]) => {
      this.qualities = snapshot;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.qualitiesObserver.unsubscribe();
  }

}
