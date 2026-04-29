import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../enums/color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { IDestination } from '../interfaces/IDestination';
import { IFeature } from '../interfaces/IFeature';
import { ISocialLink } from '../interfaces/ISocialLink';
import { ITourAbout } from '../interfaces/ITourAbout'; 
import { IBlogPost } from '../interfaces/IBlogPost';
import { Location, DateItem, SearchData } from '../interfaces/Identifiable';
import { IGalleryImage } from '../interfaces/IGalleryImage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly companyName: string = 'РумТибет';

  availableDates: DateItem[] = [
    { id: 1, date: '2026-05-10' },
    { id: 2, date: '2026-06-11' },
    { id: 3, date: '2026-07-12' },
    { id: 4, date: '2026-08-13' },
    { id: 5, date: '2026-09-14' }
  ];

  locations: Location[] = [
    { id: 101, name: 'Алтай ' },
    { id: 102, name: 'Кавказ' },
    { id: 103, name: 'Памир' },
    { id: 104, name: 'Урал' } 
  ];

  participants: number[] = [1, 2, 3, 4, 5, 6];

  searchData: SearchData = {
    location: '',
    date: '',
    participants: ''
  };

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

  collageImages: string[] = [
    'tea_canyon',
    'snake_canyon',
    'snow_mobile',
    'gree_hills'
  ];

  blogPosts: IBlogPost[] = [
    {
      title: 'Красивая Италия, какая она в реальности?',
      image: 'manarola_italy',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      title: 'Долой сомнения! Весь мир открыт для вас!',
      image: 'airplane_tail',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации...',
      date: '02/04/2023'
    },
    {
      title: 'Как подготовиться к путешествию в одиночку?',
      image: 'tourist',
      text: 'Для современного мира базовый вектор развития предполагает...',
      date: '03/04/2023'
    },
    {
      title: 'Индия . . . летим?',
      image: 'taj_mahal_india',
      text: 'Для современного мира базовый.',
      date: '04/04/2023'
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

  galleryImages: Collection<IGalleryImage> = new Collection<IGalleryImage>([
    { id: 1, url: 'balloons_cappadocia' },
    { id: 2, url: 'map_travel' },
    { id: 3, url: 'dubai_hotel' },
    { id: 4, url: 'tropical_coast' },
    { id: 5, url: 'canyon' },
    { id: 6, url: 'travel_items' },
  ]);

  socialLinks: ISocialLink[] = [
    {
      slug: 'telegram',
      url: 'https://t.me/your_channel',
      icon: 'svg/tg_icon'
    },
    {
      slug: 'vk',
      url: 'https://vk.com/your_group',
      icon: 'svg/vk_icon'
    },
    {
      slug: 'pinterest',
      url: 'https://pinterest.com/your_profile',
      icon: 'svg/pinterest_icon'
    },
    {
      slug: 'skype',
      url: 'https://skype.com/your_profile',
      icon: 'svg/skype_icon'
    }
  ];

  constructor() {
    this.setLastVisit();
    this.setVisitCount();
  }

  get isSearchInvalid(): boolean {
    return !this.searchData.location || !this.searchData.date || !this.searchData.participants;
  }

  onSearch(): void {
    console.log('Данные формы отправлены:', this.searchData);
    alert('Поиск запущен!');
  }

  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  onSubscribe(): void {
    console.log('Подписка оформлена!');
    alert('Спасибо за подписку!');
  }

  private setLastVisit(): void {
    localStorage.setItem('lastVisit', new Date().toLocaleString());
  }

  private setVisitCount(): void {
    let count = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', (count + 1).toString());
  }

}