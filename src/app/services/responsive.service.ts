/// <reference path="./responsive.d.ts" />

import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ResponsiveService {
    private isScreenChanged = new Subject();

    public screenSize: ScreenXX;

    constructor() {
        this.checkScreen();
    }

    getScreenStatus(): Observable<any> {
        return this.isScreenChanged.asObservable();
    }

    public checkScreen() {
        if (window.innerWidth <= 768 && this.screenSize !== 'sm') {
            this.screenSize = 'sm';
            this.isScreenChanged.next();
        }
        if (window.innerWidth > 768 && window.innerWidth <= 1200 && this.screenSize !== 'md') {
            this.screenSize = 'md';
            this.isScreenChanged.next();
        }
        if (window.innerWidth > 1200 && this.screenSize !== 'lg') {
            this.screenSize = 'lg';
            this.isScreenChanged.next();
        }
    }
}