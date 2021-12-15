import {Component, OnInit} from '@angular/core';
import {Languages} from "../../global/enums/languages";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public lang = Languages;

  constructor(private _translate: TranslateService) { }

  ngOnInit(): void {
  }

  public setLanguage(language: Languages): void {
    this._translate.use(language);
  }

}
