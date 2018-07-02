import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  username: string;
  constructor(private router: Router) { }

  ngOnInit() {
    let userdata = JSON.parse(localStorage.getItem('user'));
    this.username = userdata.name;
  }
  OnLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
