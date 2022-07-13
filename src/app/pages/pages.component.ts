import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    // 路由跳转
    this.router.navigate(['/pages/home'])
  }

}
