export interface UserDTO {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    activeAddress?: UserAddressDTO;
    activeMesurment?: string;
    orders?: OrderDTO[];
  }
  export interface OrderDTO {
    id?: number;
    trackingNumber?: string;
    created?: string;
    status?: string;
    items?: OrderItemDTO[];
    totalPrice?: number;
    customerName?: string;
  }
  export interface UserAddressDTO {
    id?: number;
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    active?: boolean;
    userId?: string;
  }
  export interface OrderItemDTO {
    name?: string;
    productImage?: string;
    quantity?: number;
    unitPrice?: number;
    subtotal?: number;
    color?: string;
    size?: string;
  }