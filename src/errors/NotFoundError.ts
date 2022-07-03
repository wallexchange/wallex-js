import { HTTPClientError } from './HTTPClientError';

export class NotFoundError extends HTTPClientError {
  constructor(url: string, message?: string) {
    super('NotFound', url, 404, message ?? 'Resource not found');
  }
}
