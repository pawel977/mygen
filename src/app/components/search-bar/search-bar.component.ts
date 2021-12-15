import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LabsService} from "../../services/labs.service";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {ApiCallStatus} from "../../global/enums/api-call-status";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy{
  public form = new FormGroup({});
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _fb: FormBuilder, private _labsService: LabsService) {}

  ngOnInit() {
    this._initForm();
    this._watchToBlockForm$();
  }

  ngOnDestroy() {
    this._destroy$.next(true);
  }

  onSubmit(): void {
    this._labsService.setDataApi(this.form.get('address')?.value)
  }



  public isLoading$(): Observable<boolean> {
    return this._labsService.isLoading$()
  }


  private _initForm() {
    this.form = this._fb.group({
      address: ['', Validators.required]
    })
  }

  private _watchToBlockForm$() {
    this.isLoading$().pipe(takeUntil(this._destroy$)).subscribe((isLoading: boolean) => {
    return isLoading ? this.form.disable() : this.form.enable();
    });
  }

}
