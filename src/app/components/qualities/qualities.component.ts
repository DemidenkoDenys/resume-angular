import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-qualities',
  templateUrl: './qualities.component.html',
  styleUrls: ['./qualities.component.scss']
})
export class QualitiesComponent {

  data: Observable<{}>;

  constructor(private _fetch: FetchService) {
    this.data = this._fetch.getData();
  }

}
