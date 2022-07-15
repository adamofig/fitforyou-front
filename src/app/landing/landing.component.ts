import { Component, OnInit } from '@angular/core';
import { HttpService } from '../core/system/http.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getDataFromService('test');
  }
}
