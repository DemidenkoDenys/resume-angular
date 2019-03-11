/// <reference path="./menu.d.ts" />

import { Injectable, Output, EventEmitter, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FetchService } from "../../services/fetch.service";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class MenuService {
  @Output() onModalOpen = new EventEmitter<{}>();
  @Output() onDeviceMenusOpen = new EventEmitter<boolean>();
  @Output() onDeviceViewChanged = new EventEmitter<string>();

  private _images: Images;
  private _menus: MenuItem[] = [
    {
      title: "djinni",
      show: true,
      href: "https://djinni.co/q/b6806a4b/"
    },
    {
      title: "github",
      show: true,
      href: "https://github.com/demidenkodenys"
    },
    {
      title: "linkedin",
      show: true,
      href: "https://www.linkedin.com/in/demidenko-denys"
    },
    {
      title: "diplom",
      show: true,
      prevent: true,
      action: () =>
        this.onModalOpen.emit({
          open: true,
          url: this._images["diplom"],
          type: "centered"
        })
    },
    {
      title: "review",
      show: true,
      prevent: true,
      action: () =>
        this.onModalOpen.emit({
          open: true,
          url: this._images["review"],
          type: "vertical-scroll"
        })
    },
    {
      title: "grades",
      show: true,
      prevent: true,
      action: () =>
        this.onModalOpen.emit({
          open: true,
          url: this._images["grades"],
          type: "centered"
        })
    },
    {
      title: "pdf",
      show: true,
      download: true,
      href: `${window.location.href}/assets/downloads/Demidenko_Denys_CV.pdf`
    },
    {
      title: "doc",
      show: true,
      download: true,
      href: `${window.location.href}/assets/downloads/Demidenko_Denys_CV.docx`
    },
    {
      title: "print",
      show: true,
      prevent: true,
      action: () => {
        window.print();
      }
    },
    {
      title: "ru",
      show: true,
      prevent: true,
      action: () => {
        this.changeLanguage("ru");
      }
    },
    {
      title: "ua",
      show: true,
      prevent: true,
      action: () => {
        this.changeLanguage("ua");
      }
    },
    {
      title: "en",
      show: true,
      prevent: true,
      action: () => {
        this.changeLanguage("en");
      }
    },
    {
      title: "iphone",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("iphone")
    },
    {
      title: "samsung",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("samsung")
    },
    {
      title: "ipad",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("ipad")
    },
    {
      title: "ipadpro",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("ipadpro")
    },
    {
      title: "laptop",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("laptop")
    },
    {
      title: "desktop",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("desktop")
    }
  ];

  constructor(
    private _translate: TranslateService,
    private _fetchService: FetchService,
    @Inject(DOCUMENT) private _document: any
  ) {
    this._fetchService
      .getImages()
      .subscribe((snapshot: Images) => (this._images = snapshot));
  }

  changeLanguage(language: string): void {
    this._document.documentElement.lang = language;
    this._translate.use(language);
  }

  getMenus(): MenuItem[] {
    return this._menus;
  }

  openDeviceMenus(open: boolean = false): void {
    this.onDeviceMenusOpen.emit(open);
  }

  changeDeviceView(mode: string): void {
    this.onDeviceViewChanged.emit(mode);
  }
}
