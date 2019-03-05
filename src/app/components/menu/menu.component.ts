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
  images: object;
  menuItems: MenuItem[] = [];
  modal: object = {
    open: false,
    url: '',
  };
  styleHtmlPreventScroll: HTMLStyleElement;

  constructor(
    private _menuService: MenuService,
    private _responsiveService: ResponsiveService,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(WINDOW) private _window: Window
  ){
    this.setScreen();
    this.styleHtmlPreventScroll = this._buildStyleElement();
    this.menuItems = this._menuService.getMenus();
  }

  ngOnInit(){
    this._responsiveService.getScreenStatus().subscribe(() => this.setScreen());
    this.onResize();

    this._menuService.onModalOpen.subscribe(({ open, url, type }) => {
      this.openModal(open, url, type);
    });
  }

  setScreen() : void {
    this.screen = this._responsiveService.screenSize;
  }

  onResize() : void {
    this._responsiveService.checkScreen();
  }

  openModal(open: boolean = true, url?: string, type?: string ) : void {
    this.modal = { open, url, type };
    if (open) {
      this.preventHtmlScroll();
    } else {
      this.allowHtmlScroll();    
    }
  }

  preventHtmlScroll() {
    this._document.body.appendChild(this.styleHtmlPreventScroll);
  }

  allowHtmlScroll() {
    this._document.body.removeChild(this.styleHtmlPreventScroll);
  }

  private _buildStyleElement() : HTMLStyleElement {
    const style = document.createElement("style");
    style.type = "text/css";
    style.textContent = 'html { overflow: hidden; }';
    return style;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let scrollTop = this._window.pageYOffset || this._document.documentElement.scrollTop || this._document.body.scrollTop || 0;
    this.fixed = scrollTop > 300;
  }
}
