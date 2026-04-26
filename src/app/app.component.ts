import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../enums/color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { IDestination } from '../IDestination';
import { IFeature } from '../IFeature';
import { ISocialLink } from '../ISocialLink';
import { ITourAbout } from '../ITourAbout'; 
import { IBlogPost } from '../IBlogPost';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
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
  imageTop: 'snowy_mountain.png',
  imageBottom: 'house_forest.png'
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
    'tea_canyon.png',
    'snake_canyon.png',
    'snow_mobile.png',
    'gree_hills.png'
  ];

  blogPosts: IBlogPost [] = [
    {
      title: 'Красивая Италия, какая она в реальности?',
      image: 'manarola_italy.png',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      title: 'Долой сомнения! Весь мир открыт для вас!',
      image: 'airplane_tail.png',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации...',
      date: '02/04/2023'
    },
    {
      title: 'Как подготовиться к путешествию в одиночку?',
      image: 'tourist.png',
      text: 'Для современного мира базовый вектор развития предполагает...',
      date: '03/04/2023'
    },
    {
      title: 'Индия . . . летим?',
      image: 'taj_mahal_india.png',
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
      card: 'popular_tour.png'
    },
    {
      slug: 'starry-night',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      rating: 4.5,
      price: 500,
      card: 'starry_night.png'
    },
    {
      slug: 'yoga_hill',
      title: 'Растяжка в горах',
      description: 'для тех, кто заботится о себе',
      rating: 5.0,
      price: 230,
      card: 'yoga_hill.png'
    }
  ];

  galleryImages = new Collection<string>([
    'balloons_cappadocia.png',
    'map_travel.png',
    'dubai_hotel.png',
    'tropical_coast.png',
    'canyon.png',
    'camera.png'
  ]);

  socialLinks: ISocialLink[] = [
    {
      slug: 'telegram',
      url: 'https://t.me/your_channel',
      icon: 'tg_icon.svg'
    },
    {
      slug: 'vk',
      url: 'https://vk.com/your_group',
      icon: 'vk_icon.svg'
    },
    {
      slug: 'pinterest',
      url: 'https://pinterest.com/your_profile',
      icon: 'pinterest_icon.svg'
    },
    {
      slug: 'skype',
      url: 'https://skype.com/your_profile',
      icon: 'skype_icon.svg'
    }
  ];


  constructor() {
    this.setLastVisit();
    this.setVisitCount();
  }

  onSearch() {
    console.log('Данные формы отправлены:', this.searchData);
    alert('Поиск запущен!');
  }

  isPrimaryColor(color: Color): boolean {
    return color === Color.Red || color === Color.Green || color === Color.Blue;
  }

  private setLastVisit(): void {
    localStorage.setItem('lastVisit', new Date().toLocaleString());
  }

  private setVisitCount(): void {
    let count = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', (count + 1).toString());
  }

}
