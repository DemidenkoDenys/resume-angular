import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  data: Observable<{}>;
  filters: {} = { all: true };

  constructor(private _fetch: FetchService) {
    this.data = this._fetch.getData();
  }

  onFilterChanged(filters) {
    this.filters = Object.assign({}, filters);
  }
}