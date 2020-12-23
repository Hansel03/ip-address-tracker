import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { HomeService } from './home.service';
import { environment } from '../../environments/environment';
import { GeoIP, MyIp } from './home.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public apiGeoIp: GeoIP;
  public seacrhText = new FormControl(null, Validators.required);
  public lat: number;
  public lng: number;

  constructor(private homeService: HomeService) {
    this.lat = 4.60971;
    this.lng = -74.08175;
  }

  ngOnInit(): void {
    this.getMyIP();
  }

  searchIP(ip?: string) {
    const params = {
      apiKey: environment.apiKey,
      ipAddress: this.seacrhText.value || ip,
    };

    this.homeService
      .get(environment.urls.ip, params)
      .subscribe((result: GeoIP) => {
        this.apiGeoIp = result;
        this.lat = result.location.lat;
        this.lng = result.location.lng;
      });
  }

  private getMyIP() {
    this.homeService.get(environment.urls.myip).subscribe((result: MyIp) => {
      if (result && result.ip) {
        this.searchIP(result.ip);
      }
    });
  }
}
