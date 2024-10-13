import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from "../notification/notification.component";
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-user-main',
  standalone: true,
  imports: [RouterModule, NotificationComponent, HeaderComponent, FooterComponent],
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css'
})
export class UserMainComponent {
  isFindNotificationsOpen = false;
  
}
