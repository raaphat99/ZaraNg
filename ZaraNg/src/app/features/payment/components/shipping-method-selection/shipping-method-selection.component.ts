import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AddressModalComponent } from '../address-modal/address-modal.component';
import { ZaraStoreModalComponent } from "../zara-store-modal/zara-store-modal.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-shipping-method-selection',
  standalone: true,
  imports: [AddressModalComponent, ZaraStoreModalComponent, HeaderComponent, FooterComponent],
  templateUrl: './shipping-method-selection.component.html',
  styleUrl: './shipping-method-selection.component.css',
})
export class ShippingMethodSelectionComponent implements OnInit {
  @ViewChild('imageGallery', { static: true }) imageGallery!: ElementRef;
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  velocity = 0;
  animationFrame: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const gallery = this.imageGallery.nativeElement;

    // Smooth scrolling animation after dragging
    const smoothScroll = () => {
      if (Math.abs(this.velocity) < 0.1) {
        cancelAnimationFrame(this.animationFrame);
        return;
      }
      gallery.scrollLeft += this.velocity;
      this.velocity *= 0.95; // Decelerate
      this.animationFrame = requestAnimationFrame(smoothScroll);
    };

    // Mousedown event (start dragging)
    this.renderer.listen(gallery, 'mousedown', (e: MouseEvent) => {
      this.isDragging = true;
      this.startX = e.pageX - gallery.offsetLeft;
      this.scrollLeft = gallery.scrollLeft;
      this.velocity = 0; // Reset velocity
      gallery.style.cursor = 'grabbing';
      cancelAnimationFrame(this.animationFrame); // Stop previous animation
    });

    // Mouseleave event (stop dragging)
    this.renderer.listen(gallery, 'mouseleave', () => {
      if (this.isDragging) {
        this.isDragging = false;
        gallery.style.cursor = 'grab';
        this.animationFrame = requestAnimationFrame(smoothScroll); // Start smooth scroll
      }
    });

    // Mouseup event (stop dragging)
    this.renderer.listen(gallery, 'mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        gallery.style.cursor = 'grab';
        this.animationFrame = requestAnimationFrame(smoothScroll); // Start smooth scroll
      }
    });

    // Mousemove event (dragging)
    this.renderer.listen(gallery, 'mousemove', (e: MouseEvent) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - this.startX) * 2; // Adjust speed
      this.velocity = walk; // Set velocity for smooth scroll
      gallery.scrollLeft = this.scrollLeft - walk;
    });
  }

  
}
