/// <reference path="../portfolio.d.ts" />

import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from '../../../services/fetch.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent {

  @Input() filters: FiltersInterface;

  private _filters: string[] = [];
  private _initPortfolio: Work[] = [];
  public portfolio: Work[] = [];

  private _getPortfolioObserver: any;

  constructor(
    private _fetch: FetchService,
    private _router: Router
  ) {
    this._getPortfolioObserver = this._fetch.getPortfolio().subscribe((snapshot: Work[]) => this.initPortfolio(snapshot));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filters) {
      const newFilters = changes.filters.currentValue;
      this._filters = Object.keys(newFilters).filter((key: string) => newFilters[key] === true);
      this.executefilters();
    }
  }

  ngOnDestroy() {
    this._getPortfolioObserver.unsubscribe();
  }

  initPortfolio(portfolioList: Array<Work>): void {
    if (this._initPortfolio.length === 0 || this.portfolio.length === 0) {
      this._initPortfolio = portfolioList;
      this.portfolio = portfolioList;
      this.addRoutes();
    }
  }

  addRoutes(): void {
    if (this._initPortfolio.length > 0) {
      this._initPortfolio.map(work => {
        if ('title' in work && work.title) {
          const data = { ...work, url: this.getFullWorkUrl(work.url || work.title) };
          this._router.config.unshift({
            path: data.title,
            component: DetailsComponent,
            data
          });
        }
      });
    }
  }

  getFullWorkUrl(urlPart: string): string {
    if (urlPart.indexOf('https://') + 1 || urlPart.indexOf('http://') + 1) {
      return urlPart;
    } else {
      if (urlPart.indexOf('.') + 1) {
        return `https://${urlPart}`;
      } else {
        return `https://${urlPart}.demidenko-denys.pp.ua`;
      }
    }
  }

  executefilters(): void {
    this.portfolio = (this._filters.length && this._filters[0] !== 'all') ?
      this._initPortfolio.map((work: any) => {
        return Object.keys(work['techs']).some((tech: string) => this._filters.includes(tech)) ? work : false;
      }) : this._initPortfolio;
  }

  getTitleKey(key?: string): string {
    return key ? `portfolio.${key}.title` : '';
  }

  getShortKey(key?: string): string {
    return key ? `portfolio.${key}.short` : '';
  }

  getDescriptionKey(key?: string): string {
    return key ? `portfolio.${key}.description` : '';
  }

}
