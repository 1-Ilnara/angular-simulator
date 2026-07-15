import { Component, inject } from '@angular/core'; // 1. Добавили inject в импорты из ядра
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ISocialLink } from '../../../interfaces/ISocialLink';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  private messageService = inject(MessageService);

  companyName: string = 'РумТибет';
  subscribeEmail: string = '';

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

  onSubscribe(): void {
    this.messageService.showSuccess(
      `Спасибо за подписку${this.subscribeEmail ? ', ' + this.subscribeEmail : ''}!`
    );

    this.subscribeEmail = '';
  }
  
}