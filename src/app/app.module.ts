import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppComponent } from './main/app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';

import { MenuService } from './components/menu/menu.service';
import { FetchService } from './services/fetch.service';
import { WINDOW_PROVIDERS } from "./services/window.service";
import { ExperienceComponent } from './components/experience/experience.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ExperienceComponent,
    SectionTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [
    MenuService,
    FetchService,
    WINDOW_PROVIDERS,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
