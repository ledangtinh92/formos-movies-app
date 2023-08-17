import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/layouts/main/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FooterComponent} from "src/app/layouts/footer/footer.component";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {SharedLibsModule} from "./shared/shared-libs.module";
import {ThemeService} from "./shared/themes/themes.service";
import {lightTheme} from "./shared/themes/light-theme";
import {darkTheme} from "./shared/themes/dark-theme";
import {ThemeModule} from "./shared/themes/themes.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent, FooterComponent, NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,MatButtonModule,
    SharedLibsModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    })
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
