import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'wishlist-notification',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './wishlist-notification.component.html',
    styleUrl: './wishlist-notification.component.css'
})
export class WishlistNotificationComponent {
    isVisible = false;
    message = '';

    showNotification(message: string): void {
        this.message = message;
        this.isVisible = true;

        setTimeout(() => {
            this.isVisible = false;
        }, 3000);
    }
}
