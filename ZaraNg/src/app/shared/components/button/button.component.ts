import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
@Input() text: string = '';
@Input() color: string = '';
@Input() height: string = '';
@Input() width: string = '';
@Input() border: string = '';
@Input() myClass: string = '';
@Input() type: string = '';
}
