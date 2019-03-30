/// <reference path="../../portfolio.d.ts" />

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'github-banner',
  templateUrl: './github-banner.component.html',
  styleUrls: ['./github-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubBannerComponent implements GitHubBanner {

  url: string = 'https://github.com/DemidenkoDenys/';

  @Input() disabled: boolean = true;
  @Input() size: GitHubSizes = 0;
  @Input() name: string;

  constructor() {}

  getFullUrl(): string {
    return `${this.url}${this.name ? this.name : ''}`;
  }

}
