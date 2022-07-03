import axios from 'axios';
import {
  Balance,
  BankAccount,
  BankingCard,
  Candle,
  Currency,
  FeeLevel,
  Market,
  MarketOrder,
  MarketTrade,
  NumberString,
  Order,
  OrderParams,
  Profile,
  Resolution,
  Trade,
} from './dao';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  MissingAPIKeyError,
  NotFoundError,
  UnauthorizedError,
} from './errors';

const baseURL = 'https://api.wallex.ir';
const apiKeyHeader = 'x-api-key';

interface ServerResponse<T> {
  status: boolean;
  code: number;
  message: string;
  result: T;
}

export class Client {
  private readonly apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  // ---------------------------------------------------------------------------
  // Markets
  // ---------------------------------------------------------------------------

  public async getMarkets(): Promise<Market[]> {
    const url = baseURL + '/v1/markets';
    try {
      const resp = await axios.get<
        ServerResponse<{
          symbols: { [symbol: string]: Market };
        }>
      >(url);
      return Object.keys(resp.data.result.symbols).map((symbol) => {
        return resp.data.result.symbols[symbol];
      });
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getCurrencies(): Promise<Currency[]> {
    const url = baseURL + '/v1/currencies/stats';
    try {
      const resp = await axios.get<ServerResponse<Currency[]>>(url);
      return resp.data.result;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getMarketOrders(
    symbol: string,
  ): Promise<{ ask: MarketOrder[]; bid: MarketOrder[] }> {
    const url = baseURL + '/v1/depth';
    try {
      const resp = await axios.get<
        ServerResponse<{ ask: MarketOrder[]; bid: MarketOrder[] }>
      >(url, {
        params: { symbol },
      });
      return resp.data.result;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getMarketTrades(symbol: string): Promise<MarketTrade[]> {
    const url = baseURL + '/v1/trades';
    try {
      const resp = await axios.get<
        ServerResponse<{ latestTrades: MarketTrade[] }>
      >(url, {
        params: { symbol },
      });
      return resp.data.result.latestTrades;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getCandles(
    symbol: string,
    resolution: Resolution,
    from: Date,
    to: Date,
  ): Promise<Candle[]> {
    const url = baseURL + '/v1/udf/history';
    try {
      const resp = await axios.get<
        ServerResponse<{
          t: number[];
          o: NumberString[];
          h: NumberString[];
          l: NumberString[];
          c: NumberString[];
          v: NumberString[];
        }>
      >(url, {
        params: {
          symbol,
          resolution,
          from: Math.floor(from.getTime() / 1000),
          to: Math.floor(to.getTime() / 1000),
        },
      });
      return resp.data.result.t.map((tt, index) => {
        return {
          timestamp: new Date(tt * 1000),
          open: resp.data.result.o[index],
          high: resp.data.result.h[index],
          low: resp.data.result.l[index],
          close: resp.data.result.c[index],
          volume: resp.data.result.v[index],
        };
      });
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  // ---------------------------------------------------------------------------
  // Account
  // ---------------------------------------------------------------------------

  public async getProfile(): Promise<Profile> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/profile';
    try {
      const resp = await axios.get<ServerResponse<Profile>>(url, {
        headers: { apiKeyHeader: this.apiKey },
      });
      return resp.data.result;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getBalances(): Promise<{ [symbol: string]: Balance }> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/balances';
    try {
      const resp = await axios.get<
        ServerResponse<{ balances: { [symbol: string]: Balance } }>
      >(url, {
        headers: { apiKeyHeader: this.apiKey },
      });
      return resp.data.result.balances;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getFeeLevels(): Promise<{ [symbol: string]: FeeLevel }> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/fee';
    try {
      const resp = await axios.get<
        ServerResponse<{ [symbol: string]: FeeLevel }>
      >(url, {
        headers: { apiKeyHeader: this.apiKey },
      });
      return resp.data.result;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getBankingCards(): Promise<BankingCard[]> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/card-numbers';
    try {
      const resp = await axios.get<ServerResponse<BankingCard[]>>(url, {
        headers: { apiKeyHeader: this.apiKey },
      });
      return resp.data.result;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getBankAccounts(): Promise<BankAccount[]> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/card-numbers';
    try {
      const resp = await axios.get<ServerResponse<BankAccount[]>>(url, {
        headers: { apiKeyHeader: this.apiKey },
      });
      return resp.data.result;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  // ---------------------------------------------------------------------------
  // Orders and trades
  // ---------------------------------------------------------------------------

  public async placeOrder(data: OrderParams): Promise<Order> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/orders';
    try {
      const resp = await axios.post<ServerResponse<Order>>(url, {
        headers: { apiKeyHeader: this.apiKey },
        data,
      });
      return resp.data.result;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async cancelOrder(clientOrderID: string): Promise<void> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/orders';
    try {
      await axios.delete(url, {
        headers: { apiKeyHeader: this.apiKey },
        params: { clientOrderID },
      });
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getOrder(clientOrderID: string): Promise<Order> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/orders/' + clientOrderID;
    try {
      const resp = await axios.get<ServerResponse<Order>>(url, {
        headers: { apiKeyHeader: this.apiKey },
      });
      return resp.data.result;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getOpenOrders(symbol?: string): Promise<Order[]> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/openOrders';
    try {
      const resp = await axios.get<ServerResponse<{ orders: Order[] }>>(url, {
        headers: { apiKeyHeader: this.apiKey },
        params: { symbol },
      });
      return resp.data.result.orders;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  public async getTrades(filter: {
    symbol?: string;
    side?: string;
  }): Promise<Trade[]> {
    if (this.apiKey === undefined || this.apiKey === '') {
      throw new MissingAPIKeyError();
    }

    const url = baseURL + '/v1/account/trades';
    try {
      const resp = await axios.get<
        ServerResponse<{ AccountLatestTrades: Trade[] }>
      >(url, {
        headers: { apiKeyHeader: this.apiKey },
        params: { symbol: filter.symbol, side: filter.side },
      });
      return resp.data.result.AccountLatestTrades;
    } catch (error: any) {
      this.handleAxiosError(url, error);
    }
  }

  // ---------------------------------------------------------------------------
  // Error handling
  // ---------------------------------------------------------------------------

  private handleAxiosError(url: string, error: any): never {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 400:
          throw new BadRequestError(url);
        case 401:
          throw new UnauthorizedError(url);
        case 403:
          throw new ForbiddenError(url);
        case 404:
          throw new NotFoundError(url);
      }
    }
    throw new InternalServerError(url);
  }
}
