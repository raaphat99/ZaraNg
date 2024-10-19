import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { AdminCategoryServiceService ,Category } from '../../services/admin-category-service.service';
@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [HeaderComponent, FooterComponent , FormsModule , CommonModule, RouterModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent implements OnInit {
  categories: Category[] = [];
  subcategoriesMap: Map<number, Category[]> = new Map();
  selectedCategory: Category | null = null;
  displayCategoryDialog = false;
  displayDeleteDialog = false;
  isNewCategory = false;

  newCategory: Category = {
    id: 0,
    name: '',
    description: '',
    parentCategoryId: 0,
    sizeTypeId: 0
  };

  constructor(private categoryService: AdminCategoryServiceService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    // Load main categories
    this.categoryService.getMainCategories().subscribe({
      next: (mainCategories) => {
        this.categories = mainCategories.map(category => ({
          ...category,
          expanded: false
        }));
        
        // Load subcategories for each main category
        this.categories.forEach(category => {
          if (category.id) {
            this.loadSubCategoriesForCategory(category.id);
          }
        });
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadSubCategoriesForCategory(parentId: number) {
    this.categoryService.getSubCategories(parentId).subscribe({
      next: (subcategories) => {
        this.subcategoriesMap.set(parentId, subcategories);
      },
      error: (error) => {
        console.error(`Error loading subcategories for parent ${parentId}:`, error);
      }
    });
  }

  toggleCategory(category: Category) {
    category.expanded = !category.expanded;
    
    // Load subcategories if they haven't been loaded yet
    if (category.expanded && category.id && !this.subcategoriesMap.has(category.id)) {
      this.loadSubCategoriesForCategory(category.id);
    }
  }

  hasSubcategories(category: Category): boolean {
    return this.subcategoriesMap.has(category.id!) && 
           this.subcategoriesMap.get(category.id!)!.length > 0;
  }

  getSubcategories(categoryId: number): Category[] {
    return this.subcategoriesMap.get(categoryId) || [];
  }

  showAddDialog() {
    this.isNewCategory = true;
    this.selectedCategory = { ...this.newCategory };
    this.displayCategoryDialog = true;
  }

  showEditDialog(category: Category) {
    this.isNewCategory = false;
    this.selectedCategory = { ...category };
    this.displayCategoryDialog = true;
  }

  confirmDelete(category: Category) {
    this.selectedCategory = category;
    this.displayDeleteDialog = true;
  }

  deleteCategory() {
    if (this.selectedCategory?.id) {
      this.categoryService.deleteCategory(this.selectedCategory.id).subscribe({
        next: () => {
          // If deleting a subcategory, reload its parent's subcategories
          if (this.selectedCategory?.parentCategoryId) {
            this.loadSubCategoriesForCategory(this.selectedCategory.parentCategoryId);
          } else {
            // If deleting a main category, reload all categories
            this.loadCategories();
          }
          this.displayDeleteDialog = false;
          this.selectedCategory = null;
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        }
      });
    }
  }

  saveCategory() {
    if (this.selectedCategory) {
      // Ensure main categories have parentCategoryId as 0 or null
      if (!this.selectedCategory.parentCategoryId) {
        this.selectedCategory.parentCategoryId = 0;
      }
  
      if (this.isNewCategory) {
        console.log('Creating new category:', this.selectedCategory);  // Log the category details
        this.categoryService.createCategory(this.selectedCategory).subscribe({
          next: () => {
            console.log('Category created successfully');
            this.loadCategories();
            if (this.selectedCategory?.parentCategoryId) {
              this.loadSubCategoriesForCategory(this.selectedCategory.parentCategoryId);
            } else {
              this.loadCategories();  // Reload all categories after creating a main category
            }
            this.displayCategoryDialog = false;
          },
          error: (error) => {
            console.error('Error creating category:', error);  // Log the error
          }
        });
      } else {
        console.log('Updating category:', this.selectedCategory);
        this.categoryService.updateCategory(this.selectedCategory.id, this.selectedCategory).subscribe({
          next: () => {
            console.log('Category updated successfully');
            if (this.selectedCategory?.parentCategoryId) {
              this.loadSubCategoriesForCategory(this.selectedCategory.parentCategoryId);
            } else {
              this.loadCategories();  // Reload all categories after updating a main category
            }
            this.displayCategoryDialog = false;
          },
          error: (error) => {
            console.error('Error updating category:', error);  // Log the error
          }
        });
      }
    } else {
      console.error('No category selected to save');
    }
  }
}