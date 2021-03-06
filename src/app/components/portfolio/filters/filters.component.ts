/// <reference path="../portfolio.d.ts" />

import { Component, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../../services/fetch.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent{

  @Output() onFilterChanged = new EventEmitter<FiltersInterface>();

  filters$: Observable<any>;
  filters: FiltersInterface = {};
  filtersKeys: string[] = [];
  filterObserver: any;

  constructor(
    private _fetch: FetchService,
    private _cdr: ChangeDetectorRef) {
    this.initFilters();
  }

  ngOnDestroy() {
    this.filterObserver.unsubscribe();
  }

  initFilters(): void{
    this.filters$ = this._fetch.getFilters();
    this.filterObserver = this.filters$.subscribe((snapshot: FiltersInterface) => {
      if (Object.keys(this.filters).length === 0) {
        this.setFilters(snapshot);
        this.resetFilters();
        this._cdr.detectChanges();
      }
    });
  }

  setFilters(filters: FiltersInterface): void {
    this.filtersKeys = Object.keys(filters);
    this.filters = filters;
    this.onFilterChanged.emit(filters);
  }

  resetFilters(): void {
    this.filtersKeys.map((key: string) => this.filters[key] = false);
    this.filters['all'] = true;
  }

  onFilterChecked(key: string, event: any): void{
    if (key === 'all') {
      this.resetFilters();
    } else {
      if (event.target.checked) {
        this.filters['all'] = false;
      }
    }

    this.filters[key] = event.target.checked;

    if (!Object.values(this.filters).some(value => !!value)) {
      this.filters['all'] = true;
    }

    this.onFilterChanged.emit(this.filters);
  }
}
