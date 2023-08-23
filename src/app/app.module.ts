import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/layouts/main/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FooterComponent} from "src/app/layouts/footer/footer.component";
import {NavbarTopComponent} from "./layouts/navbar-top/navbar-top.component";
import {SharedLibsModule} from "./shared/shared-libs.module";
import {ThemeService} from "./shared/themes/themes.service";
import {lightTheme} from "./shared/themes/light-theme";
import {darkTheme} from "./shared/themes/dark-theme";
import {ThemeModule} from "./shared/themes/themes.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {NavbarRightComponent} from "./layouts/navbar-right/navbar-right.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ApplicationConfigService} from "./config/application-config.service";
import {environment} from "./environment/environment";
import {httpInterceptorProviders} from "./core/interceptor";
import {HttpClientModule} from "@angular/common/http";
import {NgbCarouselModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ScrollTrackerDirective} from "./shared/directive/scroll-tracker.directive";
import { HomeComponent } from './component/home/home.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxWebstorageModule} from "ngx-webstorage";

@NgModule({
  declarations: [
    AppComponent, FooterComponent, NavbarTopComponent, NavbarRightComponent, ScrollTrackerDirective, HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule, MatButtonModule, MatCheckboxModule,
    SharedLibsModule,NgbCarouselModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    }),
    NgxWebstorageModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    MatDialogModule,
  ],
  providers: [ThemeService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService) {
    applicationConfigService.setEndpointApi(environment.SERVER_API_URL);
    applicationConfigService.setEndpointImage(environment.SERVER_IMAGES_URL);
  }
}
