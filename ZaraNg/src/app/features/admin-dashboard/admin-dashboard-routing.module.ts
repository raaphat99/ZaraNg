import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AdminCategoryComponent } from './components/admin-category/admin-category.component';

const routes: Routes = [
  { path: '', component: AdminMainComponent },
  { path: 'categories', component: AdminCategoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
