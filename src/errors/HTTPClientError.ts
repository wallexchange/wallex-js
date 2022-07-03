import { ClientError } from './ClientError';

export abstract class HTTPClientError extends ClientError {
  public readonly url: string;
  public readonly statusCode: number;

  constructor(name: string, url: string, statusCode: number, message?: string) {
    super(name, message ?? 'HTTP request failed');

    this.url = url;
    this.statusCode = statusCode;
  }
}
