import { Component } from '@angular/core';
import {LabsService} from "../../services/labs.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{

  constructor(private _labService: LabsService) { }

  public isLoading$(): Observable<boolean> {
    return this._labService.isLoading$();
  }
}
