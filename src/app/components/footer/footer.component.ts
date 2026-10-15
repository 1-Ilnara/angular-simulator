import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, faVk, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
import { ISocialLink } from '../../../interfaces/ISocialLink';
import { APP_CONFIG } from '../../tokens/app-config.token';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  config = inject(APP_CONFIG);
  subscribeEmail = '';

  socialLinks: ISocialLink[] = [
    {
      slug: 'telegram',
      url: 'https://t.me/your_channel',
      icon: faTelegram as unknown as string,
    },
    {
      slug: 'vk',
      url: 'https://vk.com/your_group',
      icon: faVk as unknown as string,
    },
    {
      slug: 'pinterest',
      url: 'https://pinterest.com/your_profile',
      icon: faPinterest as unknown as string,
    },
    {
      slug: 'skype',
      url: 'https://skype.com/your_profile',
      icon: faSkype as unknown as string,
    },
  ];

  onSubscribe(): void {
    window.alert(`Спасибо за подписку${this.subscribeEmail ? ', ' + this.subscribeEmail : ''}!`);

    this.subscribeEmail = '';
  }
}
