import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

  logout() {
    this.apiService.logout();
  }
}
