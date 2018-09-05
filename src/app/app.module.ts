import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { ArrayComponent } from "./components/array/array.component";
import { CookieComponent } from "./components/cookie/cookie.component";
import { CookieService } from "ngx-cookie-service";
import { WebstorageComponent } from "./components/webstorage/webstorage.component";
import { Ng2Webstorage } from "ngx-webstorage";
import { HttpClientComponent } from "./components/http-client/http-client.component";
import { ResourceService } from "./services/resource.service";
import { THeaderDirective } from './directives/t-header.directive';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "array", component: ArrayComponent },
  { path: "cookie", component: CookieComponent },
  { path: "web-storage", component: WebstorageComponent },
  { path: "http-client", component: HttpClientComponent }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    ArrayComponent,
    CookieComponent,
    WebstorageComponent,
    HttpClientComponent,
    THeaderDirective
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot(),
    Ng2Webstorage
  ],
  providers: [CookieService, ResourceService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
