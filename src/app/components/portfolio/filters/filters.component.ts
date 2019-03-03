import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../../services/fetch.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  @Output() onFilterChanged = new EventEmitter<{}>();

  filters$: Observable<any>;
  filters = {};
  filtersKeys: Array<string> = [];

  constructor(private _fetch: FetchService) {
    this.initFilters();  
  }

  initFilters(){
    this.filters$ = this._fetch.getFilters();
    this.filters$.subscribe(snapshot => {
      if (Object.keys(this.filters).length === 0) {
        this.setFilters(snapshot);
        this.resetFilters();
      }
    });
  }

  setFilters(filters: any) {
    this.filtersKeys = Object.keys(filters);
    this.filters = filters;
    this.onFilterChanged.emit(filters);
  }

  resetFilters() {
    this.filtersKeys.map(key => this.filters[key] = false);
    this.filters['all'] = true;
  }

  onFilterChecked(key: string, event: any){

    if (key === 'all') {
      this.resetFilters();
    } else {
      if (event.target.checked) { this.filters['all'] = false; }
    }

    this.filters[key] = event.target.checked;

    if (!Object.values(this.filters).some(value => !!value)) {
      this.filters['all'] = true;
    }

    this.onFilterChanged.emit(this.filters);
  }

}
