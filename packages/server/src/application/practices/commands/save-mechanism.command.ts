export class SaveMechanismCommand {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly implementationName: string,
    public readonly agency: string,
    public readonly _id?: string,
  ) {
  }
}
