export abstract class ClientError extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly timestamp: Date;

  constructor(name: string, message: string) {
    super(message);

    this.name = name;
    this.message = message;
    this.timestamp = new Date();
  }
}
