import { OrderStatus } from "./OrderStatus";

export interface UpdateOrderDTO {
    status: OrderStatus; // Should be of type OrderStatus, not string
  }
  