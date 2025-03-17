export interface Atributes {
    agility: number,
    strength: number,
    weight: number,
    endurance: number,
    charisma: number,
}

export interface Hero {
    id?: string,
    updatedAt?: string,
    createdAt?: string,
    name: string,
    picture: string, //Base64
    attributes: Atributes
}