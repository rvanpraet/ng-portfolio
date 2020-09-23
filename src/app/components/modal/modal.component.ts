import { GsapService } from './../../services/gsap.service';
import {
  ElementRef,
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ViewContainerRef, AfterViewInit, ChangeDetectorRef, HostListener
} from '@angular/core';
import { Power2 } from 'gsap';
import { Subject } from 'rxjs';

export interface ModalContent {
  iframeSrc?: string;
  imageUrl?: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  // tslint:disable:max-line-length
  // tslint:disable-next-line:variable-name
  @ViewChild('modal_1') modal_1: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  @ViewChild('modalDialog') modalDialog: ElementRef;


  @Input() animDuration = 0.5;
  @Input() content: ModalContent;
  @Input() hasMedia = false;
  @Input() targetElem: HTMLElement;
  @Input() show = false;
  @Output() modalOpened: EventEmitter<boolean> = new EventEmitter(false);
  @Output() modalClose: EventEmitter<boolean> = new EventEmitter(false);

  alertContentLoaded = new Subject<any>();
  backdrop: any;
  modalEl: HTMLElement;
  siteWrap: HTMLElement;

  constructor(private gsapService: GsapService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.siteWrap = document.getElementById('site-wrap');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show) {
      this.openDialog();
      this.modalOpened.next();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.modalOpened.complete();
    this.modalClose.complete();
  }

  // @HostListener('document:click', ['$event.target'])
  // public onClick(target): void {
  //   if (!!this.modalDialog && this.show) {
  //     const clickedInside = this.modalDialog.nativeElement.contains(target);
  //     if (!clickedInside) {
  //       this.closeDialog();
  //     }
  //   }
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    if (this.show) {
      const modalEl = this.modal_1.elementRef.nativeElement.previousElementSibling;
      this.cdr.detectChanges();
      const image = modalEl.children[0].children.namedItem('modal-media');
      const content = modalEl.children[0].children.namedItem('modal-content');
      let animHeight;
      let animWidth;
      if (image.children[0]) {
        if (window.innerWidth > 768) {
          animWidth = 666;
          animHeight = animWidth * 2 / 3;
          this.gsapService.to(image, this.animDuration / 2, {height: animHeight, width: animWidth});
        } else {
          animWidth = content.offsetWidth;
          animHeight = image.children[0].offsetHeight;
          this.gsapService.to(image, this.animDuration / 2, {height: animHeight, width: animWidth});
          content.style = 'width: 100% !important';
        }
      } else {
        content.style = 'width: 100% !important';
      }
    }
  }

  closeDialog(): void {
    // const modalEl = this.modal_1.elementRef.nativeElement.previousElementSibling;
    const image = this.modalEl.children[0].children.namedItem('modal-media');
    const content = this.modalEl.children[0].children.namedItem('modal-content');
    if (this.hasMedia) {
      this.animateDialogClose(image, content);
    } else {
      this.animateDialogClose(content);
    }
    setTimeout(() => {
      this.modalClose.next(false);
    }, this.animDuration * 100);

    setTimeout(() => {
      this.vc.clear();
      document.body.removeChild(this.backdrop);
      // document.body.removeChild(this.modalEl);
      this.show = false;
    }, this.animDuration * (this.hasMedia ? 2 : 1) * 1000);
  }

  openDialog(): void {
    const view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view);
    // Attach modal to viewContainer
    this.modalEl = this.modal_1.elementRef.nativeElement.previousElementSibling;
    this.modalEl.classList.remove('fade');
    this.modalEl.classList.add('modal-open');
    this.modalEl.style.display = 'block';

    // Force change detection for content of modal-body, needed to calculate width of content for animation
    this.cdr.detectChanges();

    // Create backdrop
    this.backdrop = document.createElement('DIV');
    this.backdrop.className = 'modal-backdrop';

    // Append
    document.body.appendChild(this.backdrop);
    // document.body.appendChild(this.modalEl);

    // Get image and content elements for animation
    const image = this.modalEl.children[0].children.namedItem('modal-media');
    const content = this.modalEl.children[0].children.namedItem('modal-content');

    // Start animation
    if (this.hasMedia) {
      this.gsapService.set([image, this.backdrop], { autoAlpha: 0 });
      this.animateDialogOpen(image, content);
    }
    else {
      this.gsapService.set([content, this.backdrop], { autoAlpha: 0 });
      this.animateDialogOpen(content);
    }
  }

  animateDialogOpen(el1, el2?): void {

    // Outcome width vars
    const animWidth = el1.offsetWidth;
    let animHeight;
    if (el2) { animHeight = el1.children[0].offsetHeight; }
    else { animHeight = el1.offsetHeight; }

    // Set starting point for animation
    const newRect = this.gsapService.getPosition(el1, this.targetElem);
    this.gsapService.set(el1, {
      x: newRect.left,
      y: newRect.top,
      width: newRect.width,
      height: newRect.height
    });

    // Animate backdrop and modal
    // this.gsapService.to(this.siteWrap, this.animDuration, {autoAlpha: 0, scale: 1.5});
    this.gsapService.to(this.backdrop, this.animDuration, {autoAlpha: 1});
    this.gsapService.to(el1, this.animDuration, { x: 0, y: 0, width: animWidth, height: animHeight, autoAlpha: 1, ease: Power2.easeInOut });
    if (el2) { this.gsapService.from(el2, this.animDuration, {opacity: 0, y: 120, ease: Power2.easeInOut, delay: this.hasMedia ? this.animDuration : 0}); }
  }

  animateDialogClose(el1, el2?): void {
    const newRect = this.gsapService.getPosition(el1, this.targetElem);
    const toVars = {
      x: newRect.left,
      y: newRect.top,
      width: newRect.width,
      height: newRect.height
    };

    // Animate modal and backdrop
    if (el2) { this.gsapService.to(el2, this.animDuration, {opacity: 0, y: 120, ease: Power2.easeInOut}); }
    // this.gsapService.to(this.siteWrap, this.animDuration, {autoAlpha: 1, scale: 1, ease: Power2.easeInOut, delay: this.hasMedia ? this.animDuration : 0});
    this.gsapService.to(el1, this.animDuration, { ...toVars, autoAlpha: 0, ease: Power2.easeInOut, delay: this.hasMedia ? this.animDuration : 0});
    this.gsapService.to(this.backdrop, this.animDuration, {autoAlpha: 0, ease: Power2.easeInOut, delay: this.hasMedia ? this.animDuration : 0});
  }
}
