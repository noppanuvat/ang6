import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-array",
  templateUrl: "./array.component.html",
  styleUrls: ["./array.component.scss"]
})
export class ArrayComponent implements OnInit {
  translate: TranslateService;
  liked: string[];

  constructor() {}

  ngOnInit() {
    this.liked = ["Java", "C#", "NodeJs", "Grails", "Groovy", "Angular"];
  }

  addData(data: string) {
    this.liked.unshift(data);
  }

  removeData(index: number) {
    console.info("Remove", index);
    this.liked.splice(index, 1);
  }
}
