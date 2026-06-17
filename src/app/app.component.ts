import { Component, inject } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IDestination } from '../interfaces/IDestination';
import { IBlogPost } from '../interfaces/IBlogPost';
import { SearchData } from '../interfaces/ISearchData';
import { IFeature } from '../interfaces/IFeature';
import { ITourAbout } from '../interfaces/ITourAbout';
import { ISocialLink } from '../interfaces/ISocialLink';
import { Collection } from './collection';
import { Color } from '../enums/color';
import { MessageService } from './services/message.service';
import { LocalStorageService } from './services/storage.service';
import { MessageType } from '../enums/MessageType';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  companyName: string = 'РумТибет';

  availableDates: string[] = [
    '2026-05-10',
    '2026-06-11',
    '2026-07-12',
    '2026-08-13',
    '2026-09-14'
  ];

  locations: string[] = ['Алтай', 'Кавказ', 'Памир', 'Урал'];
  participants: number[] = [1, 2, 3, 4, 5];

  collageImages: string[] = [
    'tea_canyon',
    'snake_canyon',
    'snow_mobile',
    'gree_hills'
  ];

  galleryImages: string[] = [
    'balloons_cappadocia',
    'map_travel',
    'dubai_hotel',
    'tropical_coast',
    'canyon',
    'travel_items'
  ];

  searchData: SearchData = {
    location: '',
    availableDates: '',
    participants: ''
  };

  subscribeEmail: string = '';

  tourAbout: ITourAbout = {
    subtitle: 'о нашем походе',
    title: 'Исследуйте все горные массивы мира вместе с нами',
    description: 'Его корни уходят в один фрагмент классической латыни 45 года н.э...',
    imageTop: 'snowy_mountain',
    imageBottom: 'house_forest'
  };

  features: IFeature[] = [
    {
      icon: 'experienced_guide_icon',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации.'
    },
    {
      icon: 'safe_approach_icon',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации.'
    },
    {
      icon: 'loyal_prices_icon',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации.'
    }
  ];

  destinations: IDestination[] = [
    {
      slug: 'tropical-coast',
      title: 'Озеро в горах',
      description: 'Романтическое приключение',
      rating: 4.9,
      price: 480,
      card: 'mountain_lake'
    },
    {
      slug: 'starry-night',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      rating: 4.5,
      price: 500,
      card: 'starry_night'
    },
    {
      slug: 'yoga_hill',
      title: 'Растяжка в горах',
      description: 'для тех, кто заботится о себе',
      rating: 5.0,
      price: 230,
      card: 'yoga_hill'
    }
  ];

  blogPosts: IBlogPost[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      image: 'manarola_italy',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      image: 'airplane_tail',
      text: 'Для современного мира базовый вектор развития предполагает соответствующих условий активизации...',
      date: '02/04/2023'
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку?',
      image: 'tourist',
      text: 'Для современного мира базовый вектор развития предполагает...',
      date: '03/04/2023'
    },
    {
      id: 4,
      title: 'Индия . . . летим?',
      image: 'taj_mahal_india',
      text: 'Для современного мира базовый.',
      date: '04/04/2023'
    }
  ];

  socialLinks: ISocialLink[] = [
    { slug: 'telegram', url: 'https://t.me/your_channel', icon: 'tg_icon' },
    { slug: 'vk', url: 'https://vk.com/your_group', icon: 'vk_icon' },
    { slug: 'pinterest', url: 'https://pinterest.com/your_profile', icon: 'pinterest_icon' },
    { slug: 'skype', url: 'https://skype.com/your_profile', icon: 'skype_icon' }
  ];

  destinationCollection: Collection<IDestination>;
  blogPostCollection: Collection<IBlogPost>;

  constructor() {
    this.setLastVisit();
    this.setVisitCount();

    this.destinationCollection = new Collection<IDestination>(this.destinations);
    this.blogPostCollection = new Collection<IBlogPost>(this.blogPosts);
  }

  get isSearchInvalid(): boolean {
    return !this.searchData.location || !this.searchData.availableDates || !this.searchData.participants;
  }

  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  onSearch(): void {
    if (this.isSearchInvalid) {
      this.messageService.addMessage('Пожалуйста, заполните все поля поиска!', MessageType.ERROR);
      return;
    }

    this.messageService.addMessage(
      `Поиск тура в ${this.searchData.location} успешно запущен!`,
      MessageType.SUCCESS
    );
  }

  onSubscribe(): void {
    this.messageService.addMessage(
      `Спасибо за подписку${ this.subscribeEmail ? ', ' + this.subscribeEmail : '' }!`,
      MessageType.SUCCESS
    );

    this.subscribeEmail = '';
  }

  onLoadMoreBlogs(): void {
    this.messageService.addMessage(
      'Загрузка дополнительных материалов...',
      MessageType.WARNING
    );
  }

  onViewTourProgram(event: Event): void {
    event.preventDefault();
    this.messageService.addMessage('Программа тура открыта для просмотра.', MessageType.INFO);
  }

  onViewProgramsPrice(): void {
    this.messageService.addMessage('Информация о стоимости программ загружена.', MessageType.SUCCESS);
  }

  onViewDestinationsRating(): void {
    this.messageService.addMessage('Рейтинг направлений успешно обновлен!', MessageType.INFO);
  }

  handleCloseMessage(id: number): void {
    this.messageService.closeMessage(id);
  }

  private setLastVisit(): void {
    this.localStorageService.setItem<string>('lastVisit', new Date().toLocaleString());
  }

  private setVisitCount(): void {
    const count = this.localStorageService.getItem<number>('visitCount') || 0;
    this.localStorageService.setItem('visitCount', count + 1);
  }
}
