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
      description: "Перейти на аккаунт Djinni",
      show: true,
      href: "https://djinni.co/q/b6806a4b/"
    },
    {
      description: "Перейти на репозиторий Git",
      show: true,
      href: "https://github.com/demidenkodenys"
    },
    {
      description: "Перейти на аккаунт LinkedIn",
      show: true,
      href: "https://www.linkedin.com/in/demidenko-denys"
    },
    {
      description: "Показать диплом",
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
      description: "Показать рецензию по диплому",
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
      description: "Показать оценки",
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
      description: "Скачать PDF версию резюме",
      show: true,
      download: true,
      href: `${window.location.href}/assets/downloads/Demidenko_Denys_CV.pdf`
    },
    {
      description: "Скачать DOC версию резюме",
      show: true,
      download: true,
      href: `${window.location.href}/assets/downloads/Demidenko_Denys_CV.docx`
    },
    {
      description: "Распечатать резюме",
      show: true,
      prevent: true,
      action: () => {
        window.print();
      }
    },
    {
      description: "Переключить на русский язык",
      show: true,
      prevent: true,
      action: () => {
        this.changeLanguage("ru");
      }
    },
    {
      description: "Переключить на украинский язык",
      show: true,
      prevent: true,
      action: () => {
        this.changeLanguage("ua");
      }
    },
    {
      description: "Переключить на английский язык",
      show: true,
      prevent: true,
      action: () => {
        this.changeLanguage("en");
      }
    },
    {
      description: "Открыть в iPhone 5",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("iphone")
    },
    {
      description: "Открыть в Samsung Galaxy S7",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("samsung")
    },
    {
      description: "Открыть в iPad Classic",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("ipad")
    },
    {
      description: "Открыть в iPad Pro",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("ipadpro")
    },
    {
      description: "Открыть в окне Notebook",
      show: false,
      prevent: true,
      action: () => this.changeDeviceView("laptop")
    },
    {
      description: "Открыть в окне Desktop Monitor",
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
