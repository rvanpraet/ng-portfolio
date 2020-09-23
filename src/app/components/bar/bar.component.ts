import { UtilService } from './../../services/util.service';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, AfterViewInit {

  inView = false;

  @ViewChild('fill') fill: ElementRef;

  @Input() index: number;
  @Input() name: string;
  @Input() width: number;

  constructor(private util: UtilService) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
    onWindowScroll(): void {
      this.checkViewAddAnimation();
    }

  ngAfterViewInit(): void {
    this.checkViewAddAnimation();
  }

  private checkViewAddAnimation(): void {
    if (this.fill && this.util.isScrolledIntoView(this.fill)) {
      this.fill.nativeElement.classList.add('animated');
    }
  }

}
