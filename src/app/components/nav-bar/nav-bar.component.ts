import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  translate: TranslateService;

  constructor( translate: TranslateService) { 
    this.translate = translate;
    translate.setDefaultLang('en');
  }

  ngOnInit() {
  }

}
