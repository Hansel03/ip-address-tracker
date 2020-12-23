import {
  Component,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { GeoIP } from '../home.interfaces';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit, OnChanges {
  @Input() private geoData: GeoIP;
  private latitude: number;
  private longitud: number;

  private map;
  constructor() {
    this.latitude = 4.60971;
    this.longitud = -74.08175;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.geoData.currentValue) {
      this.latitude = this.geoData.location.lat;
      this.longitud = this.geoData.location.lng;

      this.map.remove();
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.latitude, this.longitud],
      zoom: 15,
      zoomControl: false,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1,
      }
    );

    tiles.addTo(this.map);

    const grayMarker = new L.Icon({
      iconUrl: 'assets/img/icon-location.svg',
    });

    L.marker([this.latitude, this.longitud], {
      icon: grayMarker,
    }).addTo(this.map);
  }
}
