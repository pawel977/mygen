import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {LabsService} from "../../services/labs.service";
import {filter, first, Subject, takeUntil} from "rxjs";
import {Others} from "../../global/interfaces/others";
import {Lab} from "../../global/interfaces/lab";
import {Cords} from "../../global/interfaces/cords";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ts-ignore
  private map: L.Map;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _labsService: LabsService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this._labsService.getData$().pipe( filter(e => !!e.cords && !!e.laboatoria), takeUntil(this.destroy$)).subscribe((data: Others) => {
      const {cords, laboatoria} = data;

      this._clearMap();
      this._reInitMap(cords);
      this._renderMarkers(laboatoria);
      this._setTitle();
    });
  }

  private _clearMap() {
    if(this.map) {
      this.map.remove();
      // @ts-ignore
      this.map = undefined
    }
  }

  private _reInitMap(cords: Cords) {
    this.map = L.map('map', {
      center: [cords.avg_lat, cords.avg_lng],
      zoom: cords.zoom
    });
  }

  private _renderMarkers(laboatoria: Array<Lab>) {
    laboatoria.map((lab: Lab) => {
      L.marker([lab.gps_lat, lab.gps_lng])
        .addTo(this.map)
        .bindPopup(`${lab.nazwa} <br> ${lab.adres}, ${lab.miejscowosc}, ${lab.kod_pocztowy} ${ !!lab.info ? this.generateLabelForInfo(lab.info): '.'}`);
    })
  }

  private generateLabelForInfo(info: string): string {
  return `<br> dodatkowa informacja: ${info}.`
  }

  private _setTitle() {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.map);

  this.map.invalidateSize()
  }
}
