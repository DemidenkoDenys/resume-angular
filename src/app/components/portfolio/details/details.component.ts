import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { ScaleIframeDirective } from '../../../directives/scale-iframe.directive';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  currentMode: object = {};

  constructor(portfolioServise: PortfolioService) {
    this.currentMode = portfolioServise.gerDefaultMode();
  }

  ngOnInit() {}

  onIframeLoaded(e) {
    console.log('iframe loaded');
  }
}
