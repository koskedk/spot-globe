export class SaveFacilityCommand {
  constructor(
    public readonly code: number,
    public readonly name: string,
    public readonly county: string,
    public readonly mechanism: string,
    public readonly _id?: string,
  ) {
  }
}
