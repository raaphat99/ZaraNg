export interface Order {
    id:number;
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
    customerName :string,
}

