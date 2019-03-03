/// <reference path="../portfolio.d.ts" />

import { Component, Input, SimpleChanges } from '@angular/core';
import { FetchService } from '../../../services/fetch.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent {

  @Input() filters: {};

  private _filters: Array<string> = [];
  private _initPortfolio: Array<Work> = [];
  
  public portfolio: Array<Work> = [];

  constructor(private _fetch: FetchService) {
    this._fetch.getPortfolio().valueChanges().subscribe((snapshot: Array<Work>) => {
      if (this._initPortfolio.length === 0 || this.portfolio.length === 0) {
        this._initPortfolio = snapshot;
        this.portfolio = snapshot;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filters) {
      const newFilters = changes.filters.currentValue;
      this._filters = Object.keys(newFilters).filter((key: string) => newFilters[key] === true);
      this.executefilters();
    }
  }

  executefilters() {
    this.portfolio = (this._filters.length && this._filters[0] !== 'all') ?
      this._initPortfolio.map((work: any) => {
        return Object.keys(work['techs']).some((tech: string) => this._filters.includes(tech) ) ? work : false;
      }) : this._initPortfolio;
  }

  getTitleKey(key?: string) {
    return key ? `portfolio.${key}.title` : '';
  }

  getShortKey(key?: string) {
    return key ? `portfolio.${key}.short` : '';
  }

  getDescriptionKey(key?: string) {
    return key ? `portfolio.${key}.description` : '';
  }

}
