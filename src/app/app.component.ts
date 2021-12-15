import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Languages} from "./global/enums/languages";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang(Languages.POLAND);
  }
}
