import { GsapService } from './../../services/gsap.service';
import { Component, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ModalContent } from '../modal/modal.component';

export interface GalleryItem {
  category: string[];
  image: string;
  title: string;
  subtitle?: string;
  button: string;
  modalContent?: ModalContent;
  modalOpen?: boolean;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {

  boxes = [];
  cardOpen = false;
  filters: string[];
  targetElem: HTMLElement;
  galleryItems: GalleryItem[] = [
    {
      category: ['development'],
      image: 'http://workwithreinald.com/images/vattenfall_1.jpg',
      title: 'Vattenfall',
      subtitle: 'Angular App',
      button: 'Learn More',
      modalContent: {
        imageUrl: 'http://workwithreinald.com/images/vattenfall_1.jpg',
        title: 'Front-End Developer',
        message: `<p>At Vattenfall I worked on the login environment and helped rebrand this from Nuon to Vattenfall. Angular app built with custom web components.</p>
        <p>Are you or a colleague client at Vattenfall? Login to view my work:</p>
          <p><a href="http://www.vattenfall.nl/service/mijn-vattenfall" target="_blank">Mijn Vattenfall</a></p>`
      },
      modalOpen: false
    },
    {
      category: ['music'],
      image: 'http://workwithreinald.com/images/30_days_01.jpg',
      title: '30 Days of Jam',
      subtitle: 'Music & Design',
      button: 'Learn More',
      modalContent: {
        iframeSrc: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/681622158&color=%2300a1a7&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
        title: '30 Days of Jam',
        message: `<p>Thirty days of Jam is about creating every day for a whole month, during the dark month of January.</p>
        <p>Every design has a piece of music and vice versa. Some of the music has been used in different video's.</p>
        <p class="modal-mobile-xs"><a href="https://soundcloud.com/sasemoi-30daysofjam/sets/sasemoi-30-days-of-jam" target="_blank">Listen on Soundcloud</a></p>`
      },
      modalOpen: false
    },
    {
      category: ['music'],
      image: 'http://workwithreinald.com/images/vice_1.png',
      title: 'Vice',
      subtitle: 'Music For Advertimesent',
      button: 'Learn More',
      modalContent: {
        iframeSrc: 'https://www.youtube.com/embed/YbmDOHVLHC4',
        title: 'Buddha To Buddha',
        message: `<p>Together with Vice I've created the music for Buddha To Buddha's campaign 'Dented', indroducing a new line of jewelry. The track starts out with an eerie vibe that turns energetic:</p>
        <p class="modal-mobile-xs"><a href="https://www.youtube.com/watch?v=YbmDOHVLHC4" target="_blank">Watch on Youtube</a></p>`
      },
      modalOpen: false
    },
    {
      category: ['development', 'music'],
      image: 'http://workwithreinald.com/images/delver_1.jpg',
      title: 'Delver Music',
      subtitle: 'Independent Record Label',
      button: 'Learn More',
      modalContent: {
        imageUrl: 'http://workwithreinald.com/images/delver_1.jpg',
        title: 'Delver Music',
        message: `<p>Delver Music is an independent music imprint ran by me. It features releases from myself and close friends and looks to catch an ambient yet danceable vibe.</p>
                  <p>Minimalistic website in line with release artworks.</p>
                  <p><a href="http://delver-music.com" target="_blank">Visit website</a></p>`
      },
      modalOpen: false
    },
  ];
  filteredGalleryItems: GalleryItem[];

  @ViewChildren(CardComponent) cards;

  constructor(private gsapService: GsapService) { }

  ngOnInit(): void {
    this.filteredGalleryItems = this.galleryItems;
    this.createFilterCategories();
  }

  ngAfterViewInit(): void {
  }

  cardClicked(event, item): void {
    this.targetElem = event;
    this.cardOpen = true;
    item.modalOpen = true;
  }

  handleModalClosed(card): void {
    card.modalOpen = false;
    this.cardOpen = false;
  }

  handleFilter(selector: string): void {

    // this.filteredGalleryItems = [];
    const filter = selector.replace(' ', '-').toLowerCase();


    // if (filter === 'all') {
    //   this.filteredGalleryItems = this.galleryItems;
    // } else {
    //   this.filteredGalleryItems = this.galleryItems.filter(box => box.category === filter);
    // }

    // this.cdr.detectChanges();
    const cards = this.cards.map(card => card.element.nativeElement);

    // this.gsapService.fromTo(cards, 1, {scale: 0}, {scale: 1});

    // TODO: Add gsap flip for awesome transition animation
    this.gsapService.filterLayout(cards, 0.6, 'inline-flex', filter);
  }

  private createFilterCategories(): void {
    this.filters = ['ALL'].concat(...this.galleryItems.map(item => item.category.map(category => category.toUpperCase())));
    this.filters = [...new Set(this.filters)];
  }

}
