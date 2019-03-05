import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-qualities',
  templateUrl: './qualities.component.html',
  styleUrls: ['./qualities.component.scss']
})
export class QualitiesComponent {

  qualities: any;

  constructor(private _fetch: FetchService) {
    this._fetch.getQualities().subscribe(snapshot => this.qualities = snapshot);
  }

}
