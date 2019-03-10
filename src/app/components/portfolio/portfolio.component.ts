/// <reference path="./portfolio.d.ts" />

import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  filters: FiltersInterface = { all: true };

  constructor() {}

  onFilterChanged(filters: FiltersInterface): void {
    this.filters = Object.assign({}, filters);
  }
}