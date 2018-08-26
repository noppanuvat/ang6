import { Component, OnInit } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-webstorage",
  templateUrl: "./webstorage.component.html",
  styleUrls: ["./webstorage.component.scss"]
})
export class WebstorageComponent implements OnInit {
  translate: TranslateService;
  localAlertFlg: boolean = false;
  sessionAlertFlg: boolean = false;
  lMessage: string = "";
  sMessage: string = "";
  private lt: any;
  private st: any;

  constructor(
    translate: TranslateService,
    private localSroreage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) {
    this.translate = translate;
    translate.setDefaultLang("en");
  }

  ngOnInit() {}

  setLocalSroreage() {
    let v = this.localSroreage.retrieve("localStorage") || 0;
    this.localSroreage.store("localStorage", v + 1);
    this.lMessage = "Set Local Stoage Success.";
    this.alertMessage("l");
  }

  getLocalSroreage() {
    let v = this.localSroreage.retrieve("localStorage");
    this.lMessage = "Get Local Stoage Success. Cookie is : " + v;
    this.alertMessage("l");
  }

  delLocalSroreage() {
    this.localSroreage.clear("localStorage");
    this.lMessage = "Delete Local Stoage Success.";
    this.alertMessage("l");
  }

  setSessionSroreage() {
    let v = this.sessionStorage.retrieve("sessionStorage") || 0;
    this.sessionStorage.store("sessionStorage", v + 1);
    this.sMessage = "Set Session Stoage Success.";
    this.alertMessage("s");
  }

  getSessionSroreage() {
    let v = this.sessionStorage.retrieve("sessionStorage");
    this.sMessage = "Get Session Stoage Success. Cookie is : " + v;
    this.alertMessage("s");
  }

  delSessionSroreage() {
    this.sessionStorage.clear("sessionStorage");
    this.sMessage = "Delete Session Stoage Success.";
    this.alertMessage("sg");
  }

  alertMessage(name: string) {
    if (name == "l") {
      clearTimeout(this.lt);
      this.localAlertFlg = true;
      this.lt = setTimeout(() => {
        this.localAlertFlg = false;
      }, 5000);
    } else {
      clearTimeout(this.st);
      this.sessionAlertFlg = true;
      this.st = setTimeout(() => {
        this.sessionAlertFlg = false;
      }, 5000);
    }
  }
}
