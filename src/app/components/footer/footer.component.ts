import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, faVk, faPinterest, faSkype, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { ISocialLink } from '../../../interfaces/ISocialLink';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    FontAwesomeModule 
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  private messageService: MessageService = inject(MessageService);
  
  companyName: string = 'РумТибет';
  subscribeEmail: string = '';

  socialLinks: ISocialLink[] = [
    { 
      slug: 'telegram', 
      url: 'https://t.me/your_channel',
      icon: faTelegram as unknown as string 
    },
    { 
      slug: 'vk', 
      url: 'https://vk.com/your_group',
      icon: faVk as unknown as string 
    },
    { 
      slug: 'pinterest', 
      url: 'https://pinterest.com/your_profile',
      icon: faPinterest as unknown as string 
    },
    { 
      slug: 'skype', 
      url: 'https://skype.com/your_profile', 
      icon: faSkype as unknown as string 
    }
  ];

  onSubscribe(): void {
    (this.messageService as any).showSuccess(
      `Спасибо за подписку${this.subscribeEmail ? ', ' + this.subscribeEmail : ''}!`
    );

    this.subscribeEmail = '';
  }

}