import { Component, OnInit, AfterViewInit, Input, ViewChildren, ViewChild, Renderer2, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gallery-filter',
  templateUrl: './gallery-filter.component.html',
  styleUrls: ['./gallery-filter.component.scss']
})
export class GalleryFilterComponent implements OnInit, AfterViewInit {

  @Input() filterNames: string[];
  @Output() filter: EventEmitter<string> = new EventEmitter<null>();

  activeWidth = 0;
  activeLeft = 0;
  filterWrapWidth: number;

  @ViewChildren('filter') filters;
  @ViewChild('filterWrap') filterWrap;
  @ViewChild('floatRow') floatRow;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.resetFilter();
    this.stretchFloatRow();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.resetFilter();
    this.stretchFloatRow();
  }

  resetFilter(): void {
    const allFilter = this.filters.toArray().find((element: ElementRef ) => element.nativeElement.innerHTML === 'ALL');
    allFilter.nativeElement.click();
  }

  filterGallery(event): void {
    this.filters.toArray().forEach(filter => {
      filter.nativeElement.classList.remove('active');
      if (filter.nativeElement.outerText === event.target.outerText) {
        filter.nativeElement.classList.add('active');
        this.activeWidth = event.target.offsetWidth;
        this.activeLeft = event.target.offsetLeft;
      }
    });
    this.filter.next(event.target.innerHTML);
  }

  stretchFloatRow(): void {
    this.filterWrapWidth = this.filterWrap.nativeElement.offsetWidth;
  }
}
