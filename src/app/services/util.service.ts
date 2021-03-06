import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public isScrolledIntoView(elem: ElementRef): boolean {
    const elemBounding = elem.nativeElement.getBoundingClientRect();
    return (
      elemBounding.top >= 0 &&
      elemBounding.left >= 0 &&
      elemBounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      elemBounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  public getCenterCoords(elem: HTMLElement): {x, y} {
    const rect = elem.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return { x: Math.round(centerX), y: Math.round(centerY)};
  }
}
