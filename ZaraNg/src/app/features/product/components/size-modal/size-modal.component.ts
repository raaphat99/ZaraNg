import { Component } from '@angular/core';
import { UserMeasurementService } from '../../services/user-measurement.service';
import { HttpHeaders } from '@angular/common/http';
import { UserMeasurement } from '../../viewmodels/user-measurement';

@Component({
  selector: 'size-modal',
  templateUrl: './size-modal.component.html',
  styleUrl: './size-modal.component.css',
})
export class SizeModalComponent {
  isOpen = false;
  name: string = '';
  gender: string = '';
  height: number = 0;
  weight: number = 0;
  age: number = 0;
  isActive?: boolean = true;
  activeTab: string = 'input'; // Default tab is 'input'
  recommendedSize?: string = '';
  recommendedSizeImage: string = '';
  heightOptions = Array.from({ length: 131 }, (_, i) => i + 90); // 90 to 220 cm
  weightOptions = Array.from({ length: 156 }, (_, i) => i + 25); // 25 to 180 kg
  ageOptions = Array.from({ length: 88 }, (_, i) => i + 12); // 12 to 99 years

  constructor(private measurementService: UserMeasurementService) {}

  openModal(event: MouseEvent) {
    event.preventDefault();
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.resetFields();
  }

  resetFields() {
    this.name = '';
    this.gender = '';
    this.height = 0;
    this.weight = 0;
    this.age = 0;
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.isActive = checkbox.checked; // Update the state based on checkbox
}

  onSubmit(form: any): void {
    if (form.valid) {
      const measurementData: UserMeasurement = {
        mesurmentProfileName: this.name,
        height: this.height,
        weight: this.weight,
        age: this.age,
        active: this.isActive,
      };

      this.measurementService.addMeasurement(measurementData).subscribe({
        next: (response) => {
          // Assuming response contains the recommended size
          this.recommendedSize = response.sizeValue;
          this.recommendedSizeImage = 'assets/images/size-chart/size-chart.jpeg'; // Set image path based on size

          // Switch to result tab to show the recommended size
          this.setTab('result');
        },
        error: (error) => {
          console.error('Error adding measurement:', error);
        },
      });
    }
  }

  // Set the active tab
  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
