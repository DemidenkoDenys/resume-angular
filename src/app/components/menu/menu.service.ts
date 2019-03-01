/// <reference path="./menu.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  private _menus: MenuItem[] = [
    {
      description: 'Перейти на аккаунт Djinni',
      current: false,
    },
    {
      description: 'Перейти на репозиторий Git',
      current: false,
    },
    {
      description: 'Перейти на аккаунт LinkedIn',
      current: false,
    },
    {
      description: 'Показать диплом',
      current: false,
    },
    {
      description: 'Показать рецензию по диплому',
      current: false,
    },
    {
      description: 'Показать оценки',
      current: false,
    },
    {
      description: 'Скачать PDF версию резюме',
      current: false,
    },
    {
      description: 'Скачать DOC версию резюме',
      current: false,
    },
    {
      description: 'Распечатать резюме',
      current: false,
    },
    {
      description: 'Переключить на русский язык',
      current: false,
    },
    {
      description: 'Переключить на украинский язык',
      current: false,
    },
    {
      description: 'Переключить на английский язык',
      current: false,
    },
    {
      description: 'Открыть в iPhone 5',
      current: false,
    },
    {
      description: 'Открыть в Samsung Galaxy S7',
      current: false,
    },
    {
      description: 'Открыть в iPad Classic',
      current: false,
    },
    {
      description: 'Открыть в iPad Pro',
      current: false,
    },
    {
      description: 'Открыть в окне Notebook',
      current: false,
    },
    {
      description: 'Открыть в окне Desktop Monitor',
      current: false,
    }
  ]

  getMenus(){
    return this._menus;
  }
}