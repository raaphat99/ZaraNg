import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../features/shopping/cart/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent  implements OnInit{
  itemCount: number = 0;
  userName: string | null = null; 

  constructor(private cartService: CartService,private router: Router, private authService : AuthService) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.cartService.getItemCount().subscribe(
      count => {
        this.itemCount = count;  
      },
      error => {
        console.error('Error fetching cart item count:', error);
      }
    );
  }
  checkLoginStatus(): void {
    this.userName = this.authService.getUserName();
  }
}

