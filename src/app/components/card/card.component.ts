import { GsapService } from './../../services/gsap.service';
// tslint:disable-next-line:max-line-length
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy, Input, HostListener, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  // tslint:disable:indent

  tl: gsap.core.Timeline;

  @ViewChild('cardWrap') cardWrap: ElementRef;
  @ViewChild('cardWrapFlip') cardWrapFlip: ElementRef;
  @ViewChild('cardBack') cardBack: ElementRef;
  @ViewChild('cardFront') cardFront: ElementRef;

  @Input() flipContentOpen = false;
  @Input() flip = false;
  @Input() flipTime = 0.75;
  @Output() interact = new EventEmitter<any>();

  constructor(public element: ElementRef, private gsap: GsapService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tl && !this.flipContentOpen) {
      this.tl.reverse();
    }
  }

  ngOnDestroy(): void {
    this.interact.complete();
  }

  ngAfterViewInit(): void {
    const cardBack = this.cardBack.nativeElement;
    const cardFront = this.cardFront.nativeElement;
    this.gsap.set(cardBack, {rotationY: -180});

    this.tl = this.gsap.timeline({paused: true});
    this.tl
      .to(cardFront, this.flipTime, {rotationY: 180})
		  .to(cardBack, this.flipTime, {rotationY: 0}, 0)
		  .to(this.element.nativeElement, .5, {z: 50}, 0)
		  .to(this.element.nativeElement, .5, {z: 0}, .5);
  }

  @HostListener('mouseenter') mouseover(event: Event): void {
    this.tl.play();
  }

  @HostListener('mouseleave') mouseleave(event: Event): void {
    if (!this.flipContentOpen) {
      this.tl.reverse();
    }
  }

  buttonClicked(): void {
    const imageEl = this.flip ? this.cardWrapFlip.nativeElement.children[0] : this.cardWrap.nativeElement.children[0];
    this.interact.emit(imageEl);
  }


}
