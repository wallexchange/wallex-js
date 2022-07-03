import { HTTPClientError } from './HTTPClientError';

export class InternalServerError extends HTTPClientError {
  constructor(url: string, message?: string) {
    super('InternalServerError', url, 500, message ?? 'Internal server error');
  }
}
