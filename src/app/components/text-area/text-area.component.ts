import {Component} from '@angular/core';
import {LabsService} from "../../services/labs.service";
import {filter, Observable, Subject} from "rxjs";
import {Others} from "../../global/interfaces/others";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {

  constructor(private _labsService: LabsService) { }

  public getValue$(): Subject<Others> {
    return this._labsService.getData$();
  }

}
