/// <reference path="./menu.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  private _menus: MenuItem[] = [
    {
      description: 'Перейти на аккаунт Djinni',
      current: false,
      show: true,
    },
    {
      description: 'Перейти на репозиторий Git',
      current: false,
      show: true,
    },
    {
      description: 'Перейти на аккаунт LinkedIn',
      current: false,
      show: true,
    },
    {
      description: 'Показать диплом',
      current: false,
      show: true,
    },
    {
      description: 'Показать рецензию по диплому',
      current: false,
      show: true,
    },
    {
      description: 'Показать оценки',
      current: false,
      show: true,
    },
    {
      description: 'Скачать PDF версию резюме',
      current: false,
      show: true,
    },
    {
      description: 'Скачать DOC версию резюме',
      current: false,
      show: true,
    },
    {
      description: 'Распечатать резюме',
      current: false,
      show: true,
    },
    {
      description: 'Переключить на русский язык',
      current: false,
      show: true,
    },
    {
      description: 'Переключить на украинский язык',
      current: false,
      show: true,
    },
    {
      description: 'Переключить на английский язык',
      current: false,
      show: true,
    },
    {
      description: 'Открыть в iPhone 5',
      current: false,
      show: false,
    },
    {
      description: 'Открыть в Samsung Galaxy S7',
      current: false,
      show: false,
    },
    {
      description: 'Открыть в iPad Classic',
      current: false,
      show: false,
    },
    {
      description: 'Открыть в iPad Pro',
      current: false,
      show: false,
    },
    {
      description: 'Открыть в окне Notebook',
      current: false,
      show: false,
    },
    {
      description: 'Открыть в окне Desktop Monitor',
      current: false,
      show: false,
    }
  ]

  getMenus(){
    return this._menus;
  }
}