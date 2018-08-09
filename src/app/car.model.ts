export class Car {
  constructor(
    public name: string,
    public date: string,
    public model: string,
    public isSolid: boolean = false,
    public id?: number
  ) {}
}

export  interface Cars {
  cars: Car[];
}
