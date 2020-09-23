import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portfolio Dev Page';
  showFrontEnd = true;

  constructor() {}

  ngOnInit(): void {}

  public toggleFrontEnd(): void {
    this.showFrontEnd = !this.showFrontEnd;
  }
}
