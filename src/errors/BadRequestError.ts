import { HTTPClientError } from './HTTPClientError';

export class BadRequestError extends HTTPClientError {
  constructor(url: string, message?: string) {
    super('BadRequest', url, 400, message ?? 'Bad request');
  }
}
