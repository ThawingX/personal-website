import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  data:any[]= [{name:'test',time:'2022'},{name:"tx",time:"2022"}]
  constructor() {
    
  }

  ngOnInit(): void {
  }

}
