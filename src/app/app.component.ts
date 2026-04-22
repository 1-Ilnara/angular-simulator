import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../enums/color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  public companyName: string = 'РумТибет';
  public locations = ['Алтай', 'Кавказ', 'Памир', 'Урал'];
  public participants = ['1 человек', '2-4 человека', 'Группа 5+'];
  public availableDates = ['10/05/2023', '20/06/2023', '15/07/2023', '01/08/2023'];

  public searchData = {
    location: '',
    date: '',
    participants: ''
  };

  onSearch() {
    console.log('Данные формы отправлены:', this.searchData);
    alert('Поиск запущен!');
  }

  public tourAbout = {
    subtitle: 'о нашем походе',
    title: 'Исследуйте все горные массивы мира вместе с нами',
    description: 'Его корни уходят в один фрагмент классической латыни 45 года н.э...',
    imageTop: 'Images/snowy-mountain.png',
    imageBottom: 'Images/house.png'
  };
  public features = [
    {
      icon: 'Images/icon-1.svg',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации.'
    },
    {
      icon: 'Images/icon-2.svg',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации.'
    },
    {
      icon: 'Images/icon-3.svg',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации.'
    }
  ];

  public collageImages = [
    'Images/tea.png',
    'Images/hill.png',
    'Images/snowmobile.png',
    'Images/green-hills.png'
  ];

  public blogPosts =[
  {
    title: 'Красивая Италия, какая она в реальности?',
    image: '/Images/Italy.png',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    date: '01/04/2023'
  },
  {
    title: 'Долой сомнения! Весь мир открыт для вас!',
    image: '/Images/airplane-tail.png',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации...',
    date: '02/04/2023'
  },
  {
    title: 'Как подготовиться к путешествию в одиночку?',
    image: '/Images/tourist.png',
    text: 'Для современного мира базовый вектор развития предполагает...',
    date: '03/04/2023'
  },
  {
    title: 'Индия . . . летим?',
    image: '/Images/Dubai-hotel.png',
    text: 'Для современного мира базовый.',
    date: '04/04/2023'
  }
];

public destinations = [
  {
    title: 'Озеро возле гор',
    description: 'романтическое приключение',
    rating: 4.9,
    price: 480,
    class: 'card-1'
  },
  {
    title: 'Ночь в горах',
    description: 'в компании друзей',
    rating: 4.5,
    price: 500,
    class: 'card-2'
  },
  {
    title: 'Растяжка в горах',
    description: 'для тех, кто заботится о себе',
    rating: 5.0,
    price: 230,
    class: 'card-3'
  }
];

  public galleryImages = new Collection<string>([
    '/Images/Balloons-cappadocia.png',
    '/Images/map.png',
    '/Images/Dubai-hotel.png',
    '/Images/Tropical-coast.png',
    '/Images/Canyon.png',
    '/Images/Camera.png'
]);

  constructor() {
    this.setLastVisit();
    this.setVisitCount();
  }

  public isPrimaryColor(color: Color): boolean {
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
