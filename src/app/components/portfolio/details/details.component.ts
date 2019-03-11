/// <reference path="../portfolio.d.ts" />

import { Component, EventEmitter, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PortfolioService } from "../portfolio.service";
import { MenuService } from "../../menu/menu.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnDestroy {

  workName: string;
  workUrl: SafeResourceUrl;
  modes: Modes;
  currentMode: Mode;
  iframeLoaded: boolean = false;
  deviceImageSource: string = '';
  modeChangeWatcher = new EventEmitter<string>();
  modeSubscriber: any;
  routeDataSubscriber: any;
  deviceViewSubscriber: any;

  constructor(
    private _portfolioServise: PortfolioService,
    private _menuService: MenuService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {
    this.workName = this._router.url.replace('/', '');
    this.modes = this._portfolioServise.getViewModes();
    this.currentMode = this._portfolioServise.getDefaultMode();
    this.loadImageAsync(this.getFrameSrc(this.currentMode.name));

    this.routeDataSubscriber = this._route.data.subscribe((data: any) => {
      this.workUrl = this._sanitizer.bypassSecurityTrustResourceUrl(data.url);
      if (data.hasOwnProperty('mode') && this.modes.hasOwnProperty(data.mode)) {
        this.currentMode = this.modes[data.mode];
        this.loadImageAsync(this.getFrameSrc(this.currentMode.name));
      }
    });

    this.deviceViewSubscriber = this._menuService.onDeviceViewChanged.subscribe((modeName: string) => {
      if (this.modes.hasOwnProperty(modeName)) {
        this.currentMode = this.modes[modeName];
        this.loadImageAsync(this.getFrameSrc(this.currentMode.name));
      }
    });

    this.modeSubscriber = this.modeChangeWatcher.subscribe((src: string) => this.deviceImageSource = src);
  }

  onChanges() {
    this.iframeLoaded = false;
    this.deviceImageSource = '';
  }

  ngOnDestroy() {
    this._menuService.openDeviceMenus(false);
    this.modeSubscriber.unsubscribe();
    this.routeDataSubscriber.unsubscribe();
    this.deviceViewSubscriber.unsubscribe();
  }

  onIframeLoaded(): void {
    this.iframeLoaded = true;
    this._menuService.openDeviceMenus(true);
  }

  getFrameSrc(filename: string): string {
    return `../../../../assets/img/devices-frames/${filename}.png`;
  }

  loadImageAsync(src: string): void {
    this.deviceImageSource = '';
    const image = new Image();
    image.src = src;
    image.onload = () => this.modeChangeWatcher.emit(src);
    image.onerror = e => console.log(e);
  }

  navigateToList(): void {
    this._menuService.openDeviceMenus(false);
    this._router.navigate([""]);
  }

  iframeInViewport(e: any): void {
    this._menuService.openDeviceMenus(e.value);
  }

}
