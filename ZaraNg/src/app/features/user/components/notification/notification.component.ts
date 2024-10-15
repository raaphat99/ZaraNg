import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../viewmodels/Notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  isOpen = false;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }
  fetchNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data.filter(
          (notification) => !notification.isRead
        );
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
      },
    });
  }

  markAsRead(notification: Notification): void {
    notification.isRead = true;
    this.notifications = this.notifications.filter((n) => !n.isRead);

    this.notificationService.markAsRead(notification.id).subscribe({
      next: () => {
        console.log(`Notification ${notification.id} marked as read.`);
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
      },
    });
  }

  openModal(event: MouseEvent) {
    event.preventDefault();
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
