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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly companyName: string = 'РумТибет';
  locations = ['Алтай', 'Кавказ', 'Памир', 'Урал'];
  participants = ['1 человек', '2-4 человека', 'Группа 5+'];
  availableDates = ['10/05/2023', '20/06/2023', '15/07/2023', '01/08/2023'];

  searchData = {
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
      card: 'popular_tour'
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

  galleryImages = new Collection<string>([
    'balloons_cappadocia',
    'map_travel',
    'dubai_hotel',
    'tropical_coast',
    'canyon',
    'camera'
  ]);

  socialLinks: ISocialLink[] = [
    {
      slug: 'telegram',
      url: 'https://t.me/your_channel',
      icon: 'tg_icon'
    },
    {
      slug: 'vk',
      url: 'https://vk.com/your_group',
      icon: 'vk_icon'
    },
    {
      slug: 'pinterest',
      url: 'https://pinterest.com/your_profile',
      icon: 'pinterest_icon'
    },
    {
      slug: 'skype',
      url: 'https://skype.com/your_profile',
      icon: 'skype_icon'
    }
  ];

  constructor() {
    this.setLastVisit();
    this.setVisitCount();
  }

  get isSearchInvalid(): boolean {
    return !this.searchData.location || !this.searchData.date || !this.searchData.participants;
  }

  onSearch() {
    console.log('Данные формы отправлены:', this.searchData);
    alert('Поиск запущен!');
  }

  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  onSubscribe() {
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