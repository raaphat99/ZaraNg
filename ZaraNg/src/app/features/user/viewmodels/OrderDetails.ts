import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

export interface OrderDetails {
    trackingNumber: string;
    orderDate: string;
    totalPrice: number;
    shippingCost: number;
    paymentMethod: string;
    status: string;
    customer: Customer;
    items: OrderItem[];
}
