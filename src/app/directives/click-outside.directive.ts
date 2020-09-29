import { Directive, ElementRef, EventEmitter, HostListener, Output, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements OnDestroy {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.clickOutside.complete();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
