export interface UserMeasurement {
    id?: number,
    favoriteSection?: string,
    sizeValue?: string,
    mesurmentProfileName: string,
    height: number,
    weight: number,
    age: number,
    active?: boolean;
    created?: Date,
    updated?: Date
}