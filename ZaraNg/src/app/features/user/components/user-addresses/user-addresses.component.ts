import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-addresses.component.html',
  styleUrl: './user-addresses.component.css'
})


export class UserAddressesComponent {


 
   addresses:UserAddress[]=[
    {
      userName:'AMIR SHERIF',
      street:'Mostashar',
      area:'sinbllawien',
      city:'El-Senbillawien',
      state:'dakahlia',
      phone:'0123456789',
    selected:true},
      {
        userName:'Ahmed Raffat',
        street:'Galaa',
        area:'Mansoura',
        city:'Mansurah',
        state:'dakahlia',
        phone:'0123456789',
        selected:false},
      
    ]
    optionsMenu: boolean[] = [];

  constructor() {
    // Initialize the optionsMenu array with false for each address
    for (let i = 0; i < this.addresses.length; i++) {
      this.optionsMenu.push(false);
    }
  }
 

  
  // Toggles the menu visibility for the clicked icon
  toggleOptionsMenu(event: MouseEvent, index: number): void {
    event.stopPropagation(); // Prevents event propagation to the document click listener
    this.optionsMenu[index] = !this.optionsMenu[index];
  }

  isModalVisible: boolean = false; // Track modal visibility

  // Toggles the modal when the icon is clicked
  modalHasDelete:boolean=false;
  toggleModal(event: MouseEvent, index: number): void {
    event.stopPropagation(); // Prevent the click event from propagating
    this.isModalVisible = !this.isModalVisible;
    this.modalHasDelete = this.addresses[index]?.selected || false;

  }
   
      
  // Detects clicks outside of the menu or icon
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target1 = event.target as HTMLElement;

    // Close all menus if a click occurs outside both the icon and the menu
    this.optionsMenu.forEach((isOpen, i) => {
      const icon = document.querySelectorAll('.icon')[i];
      const menu = document.querySelectorAll('.menu')[i];

      // Close the menu if the click target is outside both the icon and the menu
      if (isOpen && !icon.contains(target1) && (!menu || !menu.contains(target1))) {
        this.optionsMenu[i] = false;
      }
    });
    const target2 = event.target as HTMLElement;
    const modal = document.querySelector('.modal');

    // Close the modal if the click is outside both the modal and the icon
    if (this.isModalVisible && modal && !modal.contains(target2) && !target2.closest('.icon')) {
      this.isModalVisible = false;
    }}
  
  

}
 
  
interface UserAddress{
  userName:string
  street:string
  area:string
  city:string
  state:string
  phone:string
  selected:boolean

}
