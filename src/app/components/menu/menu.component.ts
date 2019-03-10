/// <reference path="./menu.d.ts" />

import { Component, HostListener, Inject } from "@angular/core";
import { ResponsiveService } from "../../services/responsive.service";
import { MenuService } from "./menu.service";
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "../../services/window.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {

  screen: ScreenXX;
  fixed: boolean = false;
  mobileOpened: boolean = false;
  images: Images;
  menuItems: MenuItem[] = [];
  styleHtmlPreventScroll: HTMLStyleElement;

  modal: Modal = {
    open: false,
    url: ""
  };

  constructor(
    private _menuService: MenuService,
    private _responsiveService: ResponsiveService,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(WINDOW) private _window: Window
  ) {
    this.setScreen();
    this.styleHtmlPreventScroll = this._buildStyleElement();
    this.menuItems = this._menuService.getMenus();
  }

  ngOnInit() {
    this._responsiveService.getScreenStatus().subscribe(() => this.setScreen());
    this.onResize();
    this._menuService.onModalOpen.subscribe(({ open, url, type }) => {
      this.openModal(open, url, type);
    });
    this._menuService.onDeviceMenusOpen.subscribe((open: boolean) => {
      const count = this.menuItems.length;
      for (let i = count - 1; i > count - 7; i--) {
        this.menuItems[i].show = open;
      }
    });
  }

  setScreen(): void {
    this.screen = this._responsiveService.screenSize;
  }

  onResize(): void {
    this._responsiveService.checkScreen();
  }

  openModal(open: boolean = true, url?: string, type?: string): void {
    this.modal = { open, url, type };
    if (open) {
      this.preventHtmlScroll();
    } else {
      this.allowHtmlScroll();
    }
  }

  preventHtmlScroll(): void {
    this._document.body.appendChild(this.styleHtmlPreventScroll);
  }

  allowHtmlScroll(): void {
    this._document.body.removeChild(this.styleHtmlPreventScroll);
  }

  toggleMobileMenu(): void {
    this.mobileOpened = !this.mobileOpened;
  }

  private _buildStyleElement(): HTMLStyleElement {
    const style = document.createElement("style");
    style.type = "text/css";
    style.textContent = "html { overflow: hidden; }";
    return style;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let scrollTop = this._window.pageYOffset || this._document.documentElement.scrollTop || this._document.body.scrollTop || 0;
    if (scrollTop > 300) {
      if (!this.fixed) {
        this.fixed = true;
      }
    } else {
      if (this.fixed) {
        this.fixed = false;
      }
    }
  }
}
