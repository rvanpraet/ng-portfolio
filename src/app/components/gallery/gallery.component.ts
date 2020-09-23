import { GsapService } from './../../services/gsap.service';
import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ModalContent } from '../modal/modal.component';
import { UtilService } from 'src/app/services/util.service';

export interface GalleryItem {

  category: string;
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
      category: 'producer',
      image: '/assets/images/delver_1.jpg',
      title: 'Delver Music',
      subtitle: 'Independent Music Label',
      button: 'Learn More',
      modalContent: {
        imageUrl: '/assets/images/delver_1.jpg',
        title: 'Delver Music',
        message: 'Delver Music is an independent musical imprint ran by me. It features releases from myself and close friends and looks to catch an ambient yet danceable vibe.'
      },
      modalOpen: false
    },
    {
      category: 'audio-engineer',
      image: '/assets/images/eventcare_1.png',
      title: 'Nightcare',
      subtitle: '',
      button: 'Learn More',
      modalContent: {
        imageUrl: '/assets/images/eventcare_1.png',
        title: 'Nightcare Live Engineer',
        message: 'Delver Music is an independent musical imprint ran by me. It features releases from myself and close friends and looks to catch an ambient yet danceable vibe.'
      },
      modalOpen: false
    },
    {
      category: 'audio-engineer',
      image: '/assets/images/kauw_1.jpg',
      title: 'Kauw (band)',
      subtitle: '',
      button: 'Learn More',
      modalContent: {
        imageUrl: '/assets/images/kauw_1.jpg',
        title: 'Kauw Live Engineer',
        message: 'Delver Music is an independent musical imprint ran by me. It features releases from myself and close friends and looks to catch an ambient yet danceable vibe.'
      },
      modalOpen: false
    },
    {
      category: 'producer',
      image: '/assets/images/kauw_1.jpg',
      title: 'Buddha To Buddha',
      subtitle: 'Composition for ad',
      button: 'Learn More',
      modalContent: {
        iframeSrc: 'https://www.youtube.com/embed/YbmDOHVLHC4',
        title: 'Buddha To Buddha',
        message: 'Delver Music is an independent musical imprint ran by me. It features releases from myself and close friends and looks to catch an ambient yet danceable vibe.'
      },
      modalOpen: false
    }
  ];

  @ViewChild('grid') grid;
  @ViewChildren(CardComponent) cards;

  constructor(private gsapService: GsapService, private util: UtilService) { }

  ngOnInit(): void {
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

    const filter = selector.replace(' ', '-').toLowerCase();

    const cards = this.cards.map(card => card.element.nativeElement);

    this.gsapService.filterLayout(cards, 1, 'inline-flex', filter);
  }

  private createFilterCategories(): void {
    this.filters = ['ALL', ...new Set(this.galleryItems.map(item => item.category.replace('-', ' ').toUpperCase()))];
  }

}
