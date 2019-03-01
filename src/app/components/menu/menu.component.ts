/// <reference path="./menu.d.ts" />

import { Component, HostListener, Inject } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';
import { MenuService } from './menu.service';
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "../../services/window.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  screen: ScreenXX;
  fixed: boolean = false;
  menuItems: MenuItem[] = [];

  constructor(
    private _menuService: MenuService,
    private _responsiveService: ResponsiveService,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(WINDOW) private _window: Window
  ){
    this.setScreen();
    this.menuItems = this._menuService.getMenus();
  }

  ngOnInit(){
    this._responsiveService.getScreenStatus().subscribe(() => this.setScreen());
    this.onResize();
  }

  setScreen() {
    this.screen = this._responsiveService.screenSize;
  }

  onResize() {
    this._responsiveService.checkScreen();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let scrollTop = this._window.pageYOffset || this._document.documentElement.scrollTop || this._document.body.scrollTop || 0;
    this.fixed = scrollTop > 300;
  }
}
