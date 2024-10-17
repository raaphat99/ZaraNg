export interface ProductVariant {
    id: number,
    price: number,
    discountPercentage: number,
    discountedPrice: number,
    stockQuantity: number,
    created: Date,
    updated: Date,
    productColor: string,
    productMaterial: string,
    sizeName: string,
    imageUrls: string[]
}