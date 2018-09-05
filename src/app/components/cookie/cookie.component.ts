import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-cookie",
  templateUrl: "./cookie.component.html",
  styleUrls: ["./cookie.component.scss"]
})
export class CookieComponent {
  translate: TranslateService;
  cookieMessage = "";
  alertFlg: boolean = false;
  cookieValueString: string;
  private ct: any;

  constructor(private cookieService: CookieService) {}

  setCookie() {
    this.cookieService.set(
      "tCookie",
      encodeURIComponent(this.cookieValueString || "test"),
      new Date().getDate() + 7
    );
    this.cookieMessage = "Set cookie success.";
    this.alertMessage();
  }

  getCookie() {
    let cookieValue = decodeURIComponent(this.cookieService.get("tCookie"));
    this.cookieMessage = "Get cookie success. Cookie is : " + cookieValue;
    this.alertMessage();
  }

  delCookie() {
    this.cookieService.delete("tCookie");
    this.cookieMessage = "Delete cookie success.";
    this.alertMessage();
  }

  alertMessage() {
    clearTimeout(this.ct);
    this.alertFlg = true;
    this.ct = setTimeout(() => {
      this.alertFlg = false;
    }, 5000);
  }
}
