import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilterService } from '../../../productfilter/services/filter.service';

@Component({
  selector: 'app-colorsearch',
  standalone: true,
  templateUrl: './colorsearch.component.html',
  styleUrls: ['./colorsearch.component.css']
})
export class ColorsearchComponent implements OnChanges, OnInit {
  @Input() colorAndCategory!: { colors: string[], categoryId: number[] };

  products: Productsearch[] = [];

  constructor(public filter: FilterService) {}

  ngOnInit(): void {
    if (this.colorAndCategory) {
      console.log('Initial colorAndCategory', this.colorAndCategory);
      this.fetchProductsByColorAndCategory();
    }
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colorAndCategory'] && changes['colorAndCategory'].currentValue) {
      const previousValue = changes['colorAndCategory'].previousValue;
      const currentValue = changes['colorAndCategory'].currentValue;

      if (previousValue && previousValue.colors === currentValue.colors && previousValue.categoryId === currentValue.categoryId) {
        return;
      }

      console.log('Updated colorAndCategory', this.colorAndCategory);
      this.fetchProductsByColorAndCategory();
    }
  }

  fetchProductsByColorAndCategory(): void {
    const { colors, categoryId } = this.colorAndCategory;

    // تحقق من البيانات قبل بدء عملية التكرار
    console.log('Colors:', colors);
    console.log('Category IDs:', categoryId);  
    const colorParam = colors.join(',');

    categoryId.forEach((catId) => {
      const url = `http://localhost:5250/api/Products/filter?categoryId=${catId}&colors=${colorParam}`;
      console.log('Generated URL:', url);

      this.filter.url = url;
      this.filter.getAll().subscribe({
        next: data => {
          this.products = [...this.products, ...data]; // دمج المنتجات الجديدة مع القائمة الحالية
          console.log("Products with selected colors for category", catId, data);
        },
        error: err => {
          console.error('Error fetching products for selected colors:', err);
        }
      });
    });
  }

}

class Productsearch {
  constructor(
    public id: number,
    public productName: string,
    public price: number,
    public stockQuantity: number,
    public categoryId: number,
    public productId?: number,
    public sizeId?: number,
    public sizeValue?: string,
    public productColor?: number,
    public productMaterial?: number,
    public created?: string,
    public updated?: string,
    public description?: string,
    public mainImageUrl?: string,
    public filterName?: string[]
  ) {}
}
