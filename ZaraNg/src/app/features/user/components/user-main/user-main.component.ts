import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: 'app-user-main',
  standalone: true,
  imports: [RouterModule, NotificationComponent],
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css'
})
export class UserMainComponent {
  isFindNotificationsOpen = false;
  
}
