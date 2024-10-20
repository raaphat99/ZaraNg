import { Color } from "./Color";
import { Material } from "./Material";

export class ProductV {
  constructor(
    public id: number,
    public pId: number,
    public created: string,
    public updated: string,
    public sizeName: string,
    public productMaterial: Material,
    public price: number,
    public stockQuantity: number,
    public productColor: Color,
    public productId: number,
    public sizeId: number,
    public discountedPrice: number,
    public imageUrls: string

  ) { }
}
