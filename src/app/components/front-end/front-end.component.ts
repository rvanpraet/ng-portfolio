import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-end',
  templateUrl: './front-end.component.html',
  styleUrls: ['./front-end.component.scss']
})
export class FrontEndComponent implements OnInit {

  skills = [
    {
      name: 'HTML',
      percentile: 90
    },
    {
      name: 'JavaScript',
      percentile: 85
    },
    {
      name: 'SCSS',
      percentile: 80
    },
    {
      name: 'React',
      percentile: 75
    },
    {
      name: 'TypeScript',
      percentile: 75
    },
    {
      name: 'Angular',
      percentile: 70
    },
    {
      name: 'Jest',
      percentile: 70
    },
    {
      name: 'Cypress',
      percentile: 60
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
