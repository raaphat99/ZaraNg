import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
userName:string = 'AMIR SHERIF';
userEmail:string = 'm_sh8004@yahoo.com';
}
