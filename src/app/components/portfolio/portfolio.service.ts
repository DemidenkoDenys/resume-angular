import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private _defaultMode = 'desktop';

  private _viewModes = {
    iphone: {
      name: 'iphone',
      scale: 0.8387942333,
      width: 320,
      height: 568
    },
    samsung: {
      name: 'samsung',
      scale: 0.9375,
      width: 720,
      height: 1280
    },
    ipad: {
      name: 'ipad',
      scale: 0.8916030534,
      width: 1536,
      height: 2048
    },
    ipadPro : {
      name: 'ipadPro',
      scale : 0.9,
      width : 1668,
      height : 2224
    },
    laptop : {
      name: 'laptop',
      scale : 0.7945084145,
      width : 1366,
      height : 768
    },
    desktop : {
      name: 'desktop',
      scale : 0.91796875,
      width : 1920,
      height : 1100
    }
  }

  constructor() {}

  getViewModes() {
    return this._viewModes;
  }

  getViewMode(mode: string) {
    return this._viewModes.hasOwnProperty(mode) ? this._viewModes[mode] : {};
  }

  gerDefaultMode() {
    return this._viewModes[this._defaultMode];
  }

}
