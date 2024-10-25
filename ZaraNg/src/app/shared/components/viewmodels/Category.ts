export class Category {
  constructor(public id: number, public name: string, public FilterName: string[], public sizeTypeId: number, public parentCategoryName: string, public parentCategoryId: number, public clicked: boolean, public description: string) { }
}
