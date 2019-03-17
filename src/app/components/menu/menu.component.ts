/// <reference path="./menu.d.ts" />

import { Component, HostListener, Inject } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { ResponsiveService } from "../../services/responsive.service";
import { MenuService } from "./menu.service";
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "../../services/window.service";
import { fromEvent } from "rxjs";
import { map } from 'rxjs/operators';

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
  modal: Modal = { open: false, url: "" };
  screenStatusObserver: any;
  modalOpenObserver: any;
  deviceMenusObserver: any;
  scrollObserver: any;
  language: string = 'ru';

  constructor(
    private _menuService: MenuService,
    private _translate: TranslateService,
    private _responsiveService: ResponsiveService,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(WINDOW) private _window: Window
  ) {
    this.setScreen();
    this.styleHtmlPreventScroll = this._buildStyleElement();
    this.menuItems = this._menuService.getMenus();
  }

  ngOnInit() {
    this.onResize();
    this.scrollObserver = fromEvent(window, 'scroll').pipe(map(() => window.pageYOffset)).subscribe((pageYOffset: number) => this.fixMenu(pageYOffset));
    this.screenStatusObserver = this._responsiveService.getScreenStatus().subscribe(() => this.setScreen());
    this.modalOpenObserver = this._menuService.onModalOpen.subscribe(({ open, url, type }) => this.openModal(open, url, type));
    this.deviceMenusObserver = this._menuService.onDeviceMenusOpen.subscribe((open: boolean) => {
      const count = this.menuItems.length;
      for (let i = count - 1; i > count - 7; i--) {
        this.menuItems[i].show = open;
      }
    });

    this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
    });
  }

  ngOnDestroy() {
    this.scrollObserver.unsubscribe();
    this.modalOpenObserver.unsubscribe();
    this.deviceMenusObserver.unsubscribe();
    this.screenStatusObserver.unsubscribe();
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

  fixMenu(scrollTop: number): void {
    if (scrollTop <= 300 && this.fixed) {
      this.fixed = false;
    }
    if (scrollTop > 300 && !this.fixed) {
      this.fixed = true;
    }
  }

}
