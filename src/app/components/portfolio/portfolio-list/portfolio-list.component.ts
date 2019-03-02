import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../../services/fetch.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent {

  @Input() filters: {};

  private _filters: [] = [];
  private _initPortfolio: [] = [];
  public portfolio: [] = [];

  constructor(private _fetch: FetchService) {
    this._fetch.getPortfolio().valueChanges().subscribe((snapshot: []) => {
      if (this.portfolio.length === 0) {
        this.portfolio = snapshot;
        this._initPortfolio = snapshot;
      }
    });
  }

  ngOnChanges(changes) {
    if (changes.filters) {
      const tempFilters = changes.filters.currentValue;
      this._filters = Object.keys(tempFilters).filter(key => tempFilters[key]);
      this.filterPortfolio();
    }
  }

  filterPortfolio() {
    this.portfolio = (this._filters[0] !== 'all') ? this._initPortfolio.map((p: any) => {
      return Object.keys(p.techs).some(t => this._filters.includes(t)) ? p : false;
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
