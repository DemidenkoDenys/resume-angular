import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MenuService } from './components/menu/menu.service';
import { FetchService } from './services/fetch.service';
import { WINDOW_PROVIDERS } from "./services/window.service";

import { AppComponent } from './main/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { SkillsComponent } from './components/skills/skills.component';
import { QualitiesComponent } from './components/qualities/qualities.component';
import { GoalComponent } from './components/goal/goal.component';
import { InterestsComponent } from './components/interests/interests.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FiltersComponent } from './components/portfolio/filters/filters.component';
import { PortfolioListComponent } from './components/portfolio/portfolio-list/portfolio-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { DetailsComponent } from './components/portfolio/details/details.component';
import { ScaleIframeDirective } from './directives/scale-iframe.directive';
import { InViewportDirective } from './directives/in-viewport.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ExperienceComponent,
    SectionTitleComponent,
    SkillsComponent,
    QualitiesComponent,
    GoalComponent,
    InterestsComponent,
    PortfolioComponent,
    FiltersComponent,
    PortfolioListComponent,
    ModalComponent,
    DetailsComponent,
    ScaleIframeDirective,
    InViewportDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    SlickCarouselModule,
    TooltipModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [ HttpClient ]
      }
    }),
  ],
  providers: [
    MenuService,
    FetchService,
    WINDOW_PROVIDERS,
  ],
  entryComponents: [
    DetailsComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
