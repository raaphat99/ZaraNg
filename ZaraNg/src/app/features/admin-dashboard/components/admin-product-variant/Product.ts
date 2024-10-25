export class Product {
  constructor(public id: number, public created: string, public updated: string, public name: string, public description: string,
    public price: number, public stockQuantity: number, public categoryName: string,
    public MainImageUrl: string, public categoryId: number, public filterName: string[]) { }
}
