import { Color } from "./Color";
import { Material } from "./Material";

interface ProductVariantDTO {
  Id?: number;
  ProductId: number;
  Price: number;
  StockQuantity: number;
  ProductColor: Color;
  ProductMaterial: Material;
  SizeId: number;
}
