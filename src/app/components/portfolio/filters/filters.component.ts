import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../../services/fetch.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  @Output() onFilterChanged = new EventEmitter<{}>();

  filters$: Observable<{}>;
  filtersChecks = {};
  filtersKeys = [];

  constructor(private _fetch: FetchService) {
    this.filters$ = this._fetch.getFilters();
    this.filters$.subscribe((snapshot: any) => {
      if (Object.keys(this.filtersChecks).length === 0) {
        this.filtersKeys = Object.keys(snapshot);
        this.filtersKeys.map(i => snapshot[i] = false);
        snapshot['all'] = true;
        this.filtersChecks = snapshot;
        this.onFilterChanged.emit(this.filtersChecks);
      }
    });
  }

  onFilterChecked(key: string, event: any){
    if (key === 'all') {
      this.filtersKeys.map(key => this.filtersChecks[key] = false);
    } else {
      if (event.target.checked) { this.filtersChecks['all'] = false; }
    }
    this.filtersChecks[key] = event.target.checked;
    this.onFilterChanged.emit(this.filtersChecks);
  }

}
