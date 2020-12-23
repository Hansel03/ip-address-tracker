import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GeoIP } from '../home.interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnChanges {
  @Input() private geoData: GeoIP;
  public ip: string;
  public location: string;
  public timeZone: string;
  public isp: string;
  constructor() {
    this.ip = '179.15.94.123';
    this.location = 'Bogotá, CO';
    this.timeZone = 'UTC -05:00';
    this.isp = 'Colombia Móvil';
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.geoData.currentValue) {
      this.ip = this.geoData.ip;
      this.location =
        this.geoData.location.city + ', ' + this.geoData.location.country;
      this.timeZone = `UTC ${this.geoData.location.timezone}`;
      this.isp = this.geoData.isp;
    }
  }
}
