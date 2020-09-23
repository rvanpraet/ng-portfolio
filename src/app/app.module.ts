import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { FrontEndComponent } from './components/front-end/front-end.component';
import { BarComponent } from './components/bar/bar.component';

import {createCustomElement} from '@angular/elements';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CardComponent } from './components/card/card.component';
import { MusicGalleryComponent } from './components/music-gallery/music-gallery.component';
import { GalleryFilterComponent } from './components/gallery-filter/gallery-filter.component';
import { SafePipe } from './pipes/safe.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';



@NgModule({
  declarations: [
    AppComponent,
    FrontEndComponent,
    BarComponent,
    TimelineComponent,
    ContactFormComponent,
    ModalComponent,
    ScrollToTopComponent,
    GalleryComponent,
    CardComponent,
    MusicGalleryComponent,
    GalleryFilterComponent,
    SafePipe,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    ContactFormComponent,
    FrontEndComponent,
    ModalComponent,
    ScrollToTopComponent,
    TimelineComponent
  ],
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {

    const el = createCustomElement(AppComponent,
                                { injector: this.injector });
    customElements.define('app-root', el);

    const el2 = createCustomElement(FrontEndComponent,
                                { injector: this.injector });
    customElements.define('front-end-portfolio', el2);

    const el3 = createCustomElement(TimelineComponent,
      { injector: this.injector });
    customElements.define('front-end-timeline', el3);

    const el4 = createCustomElement(ContactFormComponent,
      { injector: this.injector });
    customElements.define('contact-form', el4);

    const el5 = createCustomElement(ScrollToTopComponent,
      { injector: this.injector });
    customElements.define('scroll-to-top', el5);
  }
}
