export class MainCategory {
  constructor(public id: number, public name: string, public parentCategoryName: string | null,
    public parentCategoryId: number | null, public sizeTypeId: number | null) { }
}
