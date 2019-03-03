/// <reference path="./menu.d.ts" />

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MenuService {

  private _menus: Array<MenuItem> = [
    {
      description: 'Перейти на аккаунт Djinni',
      show: true,
      current: false,
      href: 'https://djinni.co/q/b6806a4b/',
    },
    {
      description: 'Перейти на репозиторий Git',
      show: true,
      current: false,
      href: 'https://github.com/demidenkodenys',
    },
    {
      description: 'Перейти на аккаунт LinkedIn',
      show: true,
      current: false,
      href: 'https://www.linkedin.com/in/demidenko-denys',
    },
    {
      description: 'Показать диплом',
      show: true,
      current: false,
      prevent: true,
    },
    {
      description: 'Показать рецензию по диплому',
      show: true,
      current: false,
      prevent: true,
    },
    {
      description: 'Показать оценки',
      show: true,
      current: false,
      prevent: true,
    },
    {
      description: 'Скачать PDF версию резюме',
      show: true,
      current: false,
      download: true,
      href: `${window.location.href}/assets/downloads/Demidenko_Denys_CV.pdf`,
    },
    {
      description: 'Скачать DOC версию резюме',
      show: true,
      current: false,
      download: true,
      href: `${window.location.href}/assets/downloads/Demidenko_Denys_CV.docx`,
    },
    {
      description: 'Распечатать резюме',
      current: false,
      show: true,
      prevent: true,
      action: () => { window.print(); }
    },
    {
      description: 'Переключить на русский язык',
      current: false,
      show: true,
      prevent: true,
      action: () => { this.changeLanguage('ru'); }
    },
    {
      description: 'Переключить на украинский язык',
      current: false,
      show: true,
      prevent: true,
      action: () => { this.changeLanguage('ua'); }
    },
    {
      description: 'Переключить на английский язык',
      current: false,
      show: true,
      prevent: true,
      action: () => { this.changeLanguage('en'); }
    },
    {
      description: 'Открыть в iPhone 5',
      current: false,
      show: false,
      prevent: true,
    },
    {
      description: 'Открыть в Samsung Galaxy S7',
      current: false,
      show: false,
      prevent: true,
    },
    {
      description: 'Открыть в iPad Classic',
      current: false,
      show: false,
      prevent: true,
    },
    {
      description: 'Открыть в iPad Pro',
      current: false,
      show: false,
      prevent: true,
    },
    {
      description: 'Открыть в окне Notebook',
      current: false,
      show: false,
      prevent: true,
    },
    {
      description: 'Открыть в окне Desktop Monitor',
      current: false,
      show: false,
      prevent: true,
    }
  ]

  constructor(private _translate: TranslateService) {}

  changeLanguage(language: string) {
    this._translate.use(language);
  }

  getMenus(){
    return this._menus;
  }
}