export class DataItem {
  constructor(
    public readonly id: string,
    public readonly int: number,
    public readonly float: number,
    public readonly color: string,
    public readonly child: DataItemChild
  ) {}
}

export class DataItemChild {
  constructor(
    public readonly id: string,
    public readonly color: string
  ) {}
}
