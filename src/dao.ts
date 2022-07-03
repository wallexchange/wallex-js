export type OrderSide = 'BUY' | 'SELL';

export type OrderType = 'LIMIT' | 'MARKET';

export type NumberString = string | number | null | undefined;

export const isValidNumberString = (n: NumberString): boolean => {
  if (typeof n === 'number') {
    return true;
  }
  if (typeof n === 'string') {
    return !isNaN(parseFloat(n));
  }
  return false;
};

export interface Market {
  symbol: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  faName: string;
  faBaseAsset: string;
  faQuoteAsset: string;
  stepSize: number;
  tickSize: number;
  minQty: NumberString;
  minNotional: NumberString;
  stats: {
    bidPrice: NumberString;
    askPrice: NumberString;
    '24h_ch': NumberString;
    '7d_ch': NumberString;
    '24h_volume': NumberString;
    '7d_volume': NumberString;
    '24h_quoteVolume': NumberString;
    '24h_highPrice': NumberString;
    '24h_lowPrice': NumberString;
    lastPrice: NumberString;
    lastQty: NumberString;
    lastTradeSide: OrderSide;
    bidVolume: NumberString;
    askVolume: NumberString;
    bidCount: NumberString;
    askCount: NumberString;
    direction: { SELL: number; BUY: number };
  };
  createdAt: Date;
}

export interface Currency {
  key: string;
  name: string;
  name_en: string;
  rank: number;
  dominance: NumberString;
  volume_24h: NumberString;
  market_cap: NumberString;
  ath: NumberString;
  ath_change_percentage: NumberString;
  ath_date: Date;
  price: NumberString;
  daily_high_price: NumberString;
  daily_low_price: NumberString;
  weekly_high_price: NumberString;
  weekly_low_price: NumberString;
  percent_change_1h: NumberString;
  percent_change_24h: NumberString;
  percent_change_7d: NumberString;
  percent_change_14d: NumberString;
  percent_change_30d: NumberString;
  percent_change_60d: NumberString;
  percent_change_200d: NumberString;
  percent_change_1y: NumberString;
  price_change_24h: NumberString;
  price_change_7d: NumberString;
  price_change_14d: NumberString;
  price_change_30d: NumberString;
  price_change_60d: NumberString;
  price_change_200d: NumberString;
  price_change_1y: NumberString;
  max_supply: NumberString;
  total_supply: NumberString;
  circulating_supply: NumberString;
  created_at: Date;
  updated_at: Date;
}

export interface MarketOrder {
  price: NumberString;
  quantity: NumberString;
  sum: NumberString;
}

export interface MarketTrade {
  symbol: string;
  quantity: NumberString;
  price: NumberString;
  sum: NumberString;
  timestamp: Date;
}

export type Resolution = '1' | '60' | '180' | '360' | '720' | '1D';

export interface Candle {
  timestamp: Date;
  open: NumberString;
  high: NumberString;
  low: NumberString;
  close: NumberString;
  volume: NumberString;
}

export interface Profile {
  tracking_id: number;
  first_name: string;
  last_name: string;
  national_code: string;
  face_image: string;
  birthday: string;
  address: {
    country?: string;
    city?: string;
    location?: string;
    province?: string;
    postal_code?: string;
    house_number?: string;
  };
  phone_number: {
    area_code: string;
    main_number: string;
  };
  mobile_number: string;
  verification: string;
  email: string;
  invite_code: string;
  avatar: any;
  commission: number;
  settings: {
    theme: string;
    mode: string;
    order_submit_confirm: boolean;
    order_delete_confirm: boolean;
    default_mode: boolean;
    favorite_markets: string[];
    choose_trading_type: boolean;
    coin_deposit: boolean;
    coin_withdraw: boolean;
    money_deposit: boolean;
    money_withdraw: boolean;
    logins: boolean;
    trade: boolean;
    api_key_expiration: boolean;
    notification: {
      email: {
        is_enable: boolean;
        actions: {
          coin_deposit: { is_enable: boolean; label: string };
          coin_withdraw: { is_enable: boolean; label: string };
          money_deposit: { is_enable: boolean; label: string };
          money_withdraw: { is_enable: boolean; label: string };
          logins: { is_enable: boolean; label: string };
          api_key_expiration: { is_enable: boolean; label: string };
          manual_deposit: { is_enable: boolean; label: string };
        };
        label: string;
      };
      announcement: {
        is_enable: boolean;
        actions: {
          coin_deposit: { is_enable: boolean; label: string };
          coin_withdraw: { is_enable: boolean; label: string };
          money_deposit: { is_enable: boolean; label: string };
          money_withdraw: { is_enable: boolean; label: string };
          logins: { is_enable: boolean; label: string };
          api_key_expiration: { is_enable: boolean; label: string };
          manual_deposit: { is_enable: boolean; label: string };
        };
        label: string;
      };
      push: {
        is_enable: boolean;
        actions: {
          coin_deposit: { is_enable: boolean; label: string };
          coin_withdraw: { is_enable: boolean; label: string };
          money_deposit: { is_enable: boolean; label: string };
          money_withdraw: { is_enable: boolean; label: string };
          logins: { is_enable: boolean; label: string };
          api_key_expiration: { is_enable: boolean; label: string };
          manual_deposit: { is_enable: boolean; label: string };
        };
        label: string;
      };
    };
  };
  status: {
    first_name: string;
    last_name: string;
    national_code: string;
    national_card_image: string;
    face_image: string;
    birthday: string;
    address: string;
    phone_number: string;
    mobile_number: string;
    email: string;
  };
  kyc_info: {
    details: {
      mobile_activation: boolean;
      personal_info: boolean;
      financial_info: boolean;
      phone_number: boolean;
      national_card: boolean;
      face_recognition: boolean;
      admin_approval: boolean;
    };
    level: number;
  };
  meta: {
    disabled_features: string[];
  };
}

export interface Balance {
  asset: string;
  faName: string;
  fiat: boolean;
  value: NumberString;
  locked: NumberString;
}

export interface FeeLevel {
  levels: {
    [value: string]: {
      maker_fee: NumberString;
      taker_fee: NumberString;
      name: string;
    };
  };
  recent_days: number;
  recent_days_sum: number;
  maker_fee: NumberString;
  taker_fee: NumberString;
  is_fixed: boolean;
}

export interface BankingCard {
  id: number;
  card_number: string;
  owners: string[];
  status: string;
  is_default: number;
}

export interface BankAccount {
  id: number;
  iban: string;
  owners: string[];
  bank_name: string;
  status: string;
  is_default: number;
  bank_details: { code: string; label: string };
}

export interface OrderParams {
  symbol: string;
  type: OrderType;
  side: OrderSide;
  price: NumberString;
  quantity: NumberString;
  client_id?: string;
}

export interface Order {
  symbol: string;
  type: OrderType;
  side: OrderSide;
  price: NumberString;
  origQty: NumberString;
  origSum: NumberString;
  executedPrice: NumberString;
  executedQty: NumberString;
  executedSum: NumberString;
  executedPercent: NumberString;
  status: string;
  active: string;
  clientOrderId: string;
  created_at: Date;
}

export interface Trade {
  symbol: string;
  quantity: NumberString;
  price: NumberString;
  sum: NumberString;
  fee: NumberString;
  feeCoefficient: NumberString;
  feeAsset: string;
  isBuyer: string;
  timestamp: Date;
}
