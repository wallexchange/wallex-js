import { HTTPClientError } from './HTTPClientError';

export class UnauthorizedError extends HTTPClientError {
  constructor(url: string, message?: string) {
    super('Unauthorized', url, 401, message ?? 'Unauthorized');
  }
}
