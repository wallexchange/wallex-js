import { ClientError } from './ClientError';

export class MissingAPIKeyError extends ClientError {
  constructor() {
    super('MissingAPIKey', 'Missing API key');
  }
}
