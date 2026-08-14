import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { MessageService } from './services/message.service';
import { LocalStorageService } from './services/storage.service';
import { LoaderComponent } from './components/loader/loader.component'
import { StyleTestOneComponent } from './components/style-test-one/style-test-one.component';
import { StyleTestTwoComponent } from './components/style-test-two/style-test-two.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    RouterOutlet, 
    MessageComponent,
    LoaderComponent,
    StyleTestOneComponent,
    StyleTestTwoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  companyName: string = 'РумТибет';

}