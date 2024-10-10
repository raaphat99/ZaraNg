import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Notification {
  title: string;
  message: string;
  date: Date;
  read: boolean;
}
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
 
  notifications: Notification[] = [];
  isOpen = false;

  ngOnInit(): void {
    this.notifications = [
      {
        title: 'Order Shipped',
        message: 'Your order #12345 has been shipped. You can track the shipment via your account.',
        date: new Date('2024-10-01'),
        read: false
      },
      {
        title: 'Order Shipped',
        message: 'Your order #12345 has been shipped. You can track the shipment via your account.',
        date: new Date('2024-10-01'),
        read: false
      },
      {
        title: 'Account Update',
        message: 'Your account password was successfully updated.',
        date: new Date('2024-09-28'),
        read: false
      },
      {
        title: 'Account Update',
        message: 'Your account password was successfully updated.',
        date: new Date('2024-09-28'),
        read: false
      }
    ];
  }

  markAsRead(notification: Notification): void {
    this.notifications = this.notifications.filter(n => n !== notification);
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }
  openModal(event: MouseEvent) {
    event.preventDefault();
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

}
