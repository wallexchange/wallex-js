import { HTTPClientError } from './HTTPClientError';

export class ForbiddenError extends HTTPClientError {
  constructor(url: string, message?: string) {
    super('Forbidden', url, 403, message ?? 'Access forbidden');
  }
}
