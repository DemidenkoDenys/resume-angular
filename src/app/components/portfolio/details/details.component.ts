/// <reference path="../portfolio.d.ts" />

import { Component, EventEmitter, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { PortfolioService } from "../portfolio.service";
import { MenuService } from "../../menu/menu.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnDestroy {

  //TODO unsubscribe all listeners
  workName: string;
  modes: Modes;
  currentMode: Mode;
  iframeLoaded: boolean = false;
  deviceImageSource: string = '';
  modeChangeWatcher = new EventEmitter<string>();

  constructor(
    private _portfolioServise: PortfolioService,
    private _menuService: MenuService,
    private _router: Router
  ) {
    this.workName = this._router.url.replace('/', '');
    this.modes = this._portfolioServise.getViewModes();
    this.currentMode = this._portfolioServise.gerDefaultMode();
    this.loadImageAsync(this.getFrameSrc(this.currentMode.name));

    this._menuService.onDeviceViewChanged.subscribe((modeName: string) => {
      if (this.modes.hasOwnProperty(modeName)) {
        this.currentMode = this.modes[modeName];
        this.loadImageAsync(this.getFrameSrc(this.currentMode.name));
      }
    });

    this.modeChangeWatcher.subscribe((src: string) => this.deviceImageSource = src);
  }

  onChanges() {
    this.iframeLoaded = false;
  }

  ngOnDestroy() {
    this._menuService.openDeviceMenus(false);
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

  iframeInViewport(e) {
    this._menuService.openDeviceMenus(e.value);
  }

}
