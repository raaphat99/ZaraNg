export interface Product {
    name: string,
    description: string,
    price: number,
    stockQuantity: number,
    mainImageUrl?: string,
    created?: Date
    updated?: Date
}
