import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Order } from '../../../user/viewmodels/purchases';
import { OrderAdminService } from '../../services/order-admin.service';
import { FormsModule } from '@angular/forms';
import { OrderStatus } from '../../viewmodels/OrderStatus';

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css',
})
export class AdminOrderComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder!: Order;
  selectedOrderr: any = null;
  statusError: string | null = null;

  displayOrderDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  displayEditDialog: boolean = false;
  newStatus!: OrderStatus; 

  constructor(
    private orderService: OrderAdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrdersForAdmin().subscribe(
      (data: Order[]) => {
        this.orders = data;
        this.orders.forEach((order) => {
          console.log('Order ID:', order.id);
        });
      },
      (error) => {
        console.error('Failed to load all orders for admin:', error);
      }
    );
  }

  viewOrder(order: Order) {
    this.selectedOrder = order;
    this.displayOrderDialog = true;
  }

  confirmDeleteOrder(order: Order) {
    this.selectedOrder = order;
    this.displayDeleteDialog = true;
  }

  deleteOrder(order: Order | null) {
    if (order) {
      this.orderService.deleteOrder(order.id).subscribe(
        () => {
          console.log('Order deleted successfully');
          this.loadOrders(); 
          this.displayDeleteDialog = false;
        },
        (error) => {
          console.error('Failed to delete the order:', error);
        }
      );
    }
  }

  editOrderStatus(order: any) {
    this.selectedOrderr = order;
    this.selectedOrder = order;
    this.displayEditDialog = true;
  }

  saveOrderStatus(newStatus: string) {
    if (!this.selectedOrderr) {
      console.error('No order is selected.');
      return;
    }

    if (this.selectedOrderr.newStatus === this.selectedOrderr.currentStatus) {
      this.statusError =
        'The selected status is the same as the current status. Please choose a different status.';
    }

    console.log('Selected order:', this.selectedOrderr);
    console.log('New status:', newStatus);

    if (this.selectedOrderr) {
      this.orderService
        .updateOrderStatus(this.selectedOrderr.id, newStatus)
        .subscribe(
          (response) => {
            console.log('Order status updated successfully:', response);

            this.selectedOrderr.status = newStatus;

            this.selectedOrderr = null;
            this.displayEditDialog = false;

            this.loadOrders();

            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Error updating order status:', error);
            console.log('Request data:', { status: newStatus }); // Log request data for debugging

            if (error.status === 400) {
              this.statusError = 'Invalid status update request.';
            } else if (error.status === 500) {
              this.statusError = 'Server error. Please try again later.';
            } else {
              this.statusError =
                'An error occurred. Please check the network connection.';
            }
          }
        );
    }
  }

  getOrderTotal(items: any[]): number {
    return items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }
}
