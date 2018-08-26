import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  translate: TranslateService;
  profileUser: ProfileUser;
  clickEdit: boolean = false;

  constructor(translate: TranslateService) {
    this.translate = translate;
    translate.setDefaultLang("en");
  }

  ngOnInit() {
    this.profileUser = {
      name: "Panuvat Jampasri",
      email: "panuvat.mail@gmail.com",
      address: {
        villageNo: "26 m. 15",
        district: "Kumphawapi",
        province: "Udonthani",
        postalCode: 41370
      }
    };
  }

  editProfile() {
    this.clickEdit =! this.clickEdit;
  }

}

interface Address {
  villageNo: string;
  district: string;
  province: string;
  postalCode: number;
}

interface ProfileUser {
  name: string;
  email: string;
  address: Address;
}
