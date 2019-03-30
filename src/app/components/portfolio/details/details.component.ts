/// <reference path="../portfolio.d.ts" />

import { Component, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PortfolioService } from "../portfolio.service";
import { MenuService } from "../../menu/menu.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from "rxjs";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnDestroy {

  work: Work;
  workUrl: SafeResourceUrl;
  modes: Modes;
  currentMode: Mode;
  iframeLoaded: boolean = false;
  deviceImageSource: string = '';
  modeChangeWatcher = new EventEmitter<string>();
  subscriptions: Subscription = new Subscription();

  constructor(
    private _portfolioServise: PortfolioService,
    private _menuService: MenuService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _cdr: ChangeDetectorRef
  ) {
    this.modes = this._portfolioServise.getViewModes();
    this.currentMode = this._portfolioServise.getDefaultMode();
    this.loadImageAsync(this.getFrameSrc(this.currentMode.name));

    this.subscriptions.add(this._route.data.subscribe((data: any) => {
      this.work = data;
      this.workUrl = this._sanitizer.bypassSecurityTrustResourceUrl(data.url);
      if ('mode' in data && data.mode in this.modes) {
        this.currentMode = this.modes[data.mode];
        this.loadImageAsync(this.getFrameSrc(this.currentMode.name));
        this._cdr.detectChanges();
      }
    }));

    this.subscriptions.add(this._menuService.onDeviceViewChanged.subscribe((modeName: string) => {
      if (modeName in this.modes) {
        this.currentMode = this.modes[modeName];
        this.loadImageAsync(this.getFrameSrc(this.currentMode.name));
        this._cdr.detectChanges();
      }
    }));

    this.subscriptions.add(this.modeChangeWatcher.subscribe((src: string) => {
      this.deviceImageSource = src;
      this._cdr.detectChanges();
    }));
  }

  onChanges() {
    this.iframeLoaded = false;
    this.deviceImageSource = '';
  }

  ngOnDestroy() {
    this.iframeLoaded = false;
    this._menuService.openDeviceMenus(false);
    this.subscriptions.unsubscribe();
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
