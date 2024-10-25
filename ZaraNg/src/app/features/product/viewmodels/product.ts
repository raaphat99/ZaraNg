export interface Product {
    categoryId?: number,
    id: number,
    name: string,
    description: string,
    price: number,
    stockQuantity: number,
    mainImageUrl?: string,
    created?: Date,
    updated?: Date,
    sizeType: string
}
