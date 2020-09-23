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
      percentile: 75
    },
    {
      name: '(S)CSS',
      percentile: 75
    },
    {
      name: 'Angular',
      percentile: 75
    },
    {
      name: 'JavaScript',
      percentile: 70
    },
    {
      name: 'jQuery',
      percentile: 55
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
