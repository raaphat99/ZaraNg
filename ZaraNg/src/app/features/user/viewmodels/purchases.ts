export interface Order {
    trackingNumber: string; 
    created: string; 
    items: {
        name: string; 
        quantity: number;
        unitPrice: number;
        productImage: string; 
    }[];
    totalPrice: number; 
    status:string;
}

