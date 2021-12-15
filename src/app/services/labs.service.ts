import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {Api} from "../global/api/api";
import {Others} from "../global/interfaces/others";
import {ApiCallStatus} from "../global/enums/api-call-status";

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  private _data$: Subject<Others> = new Subject<Others>();
  private statusApiCall$: BehaviorSubject<ApiCallStatus> = new BehaviorSubject<ApiCallStatus>(ApiCallStatus.COMPLETE)

  constructor(private _http: HttpClient) { }


 /**
  * Nie ma nigdzie opisane jak szukać adresu przez input, wiec zawsze strzelam na domyslne
  *
  * przygotowane pod ewentualnego sercha
  * **/
  public setDataApi(address: string | null): void {
    // const url = `${Api.labs}/${address}`
   const url = Api.labs

   this.statusApiCall$.next(ApiCallStatus.PENDING)
   this._http.get<Others>(url).subscribe((data: Others) => {
      this._data$.next(data)
     this.statusApiCall$.next(ApiCallStatus.COMPLETE)
    }, () => {
     this.statusApiCall$.next(ApiCallStatus.ERROR)
     alert('bład api');
   });
  }

  public getData$(): Subject<Others> {
    return this._data$;
  }

  public getStatusApiCall$(): BehaviorSubject<ApiCallStatus> {
    return this.statusApiCall$;
  }

  public isLoading$(): Observable<boolean> {
    return this.getStatusApiCall$().pipe(map((status: ApiCallStatus) => {
      return status === ApiCallStatus.PENDING;
    }))
  }
}
