export enum BankTypes {
  personal = 'PERSONAL_BANKING',
  business = 'BUSINESS_BANKING',
}

export type Currency = 'NGN' | 'USD' | 'GBP';

export type Notation = 'compact' | 'standard';

export type FormatNumberArgs = {
  number: number;
  isCurrency?: boolean;
  currency?: Currency;
  notation?: Notation;
};

export type Res = { data: { responseCode: 99 | 101 | 102; data: any } };

export type Account = {
  accountNumber: string;
  name: string;
  type: string;
  currency: string;
  status: string;
  balance: number;
};

export interface Institution {
  _id: string;
  auth_methods: AuthMethod[];
  authMethod: AuthMethodType;
  bank_code: null | string;
  country: Country;
  icon: string;
  identifier: string;
  name: string;
  primaryColor: string;
  type: InstitutionType;
  ui: UI;
  forgotPasswordLink?: null | string;
  timeout?: number;
  bankCode?: null | string;
  sandbox?: Sandbox;
}

export interface Session {
  id: string;
  ui: UI;
}

export interface AuthMethod {
  _id: string;
  name: AuthMethodName;
  type: AuthMethodType;
  ui: UI;
}

export enum AuthMethodName {
  InternetBanking = 'Internet Banking',
  MobileBanking = 'Mobile Banking',
  PrimusPlus = 'PrimusPlus',
  SterlingOneBank = 'Sterling OneBank',
}

export enum AuthMethodType {
  InternetBanking = 'internet_banking',
  MobileBanking = 'mobile_banking',
  PrimusPlus = 'primus_plus',
}

export interface UI {
  form: Form[];
  title: string;
}

export interface Form {
  contentType: ContentType;
  hint?: string;
  name: FormName;
  type: FormType;
  maxLength?: number;
  options?: Option[];
  value?: string;
}

export enum ContentType {
  Integer = 'integer',
  Password = 'password',
  String = 'string',
}

export enum FormName {
  AccessCode = 'accessCode',
  AccountNo = 'accountNo',
  AccountNumber = 'accountNumber',
  Accountno = 'accountno',
  AuthType = 'authType',
  CAPTCHA = 'captcha',
  Card = 'card',
  MPin = 'mPin',
  Password = 'password',
  Pin = 'pin',
  Token = 'token',
  Username = 'username',
}

export interface Option {
  events: Events;
  label: string;
  value: number;
}

export interface Events {
  onChange: OnChange;
}

export interface OnChange {
  effects: Effect[];
}

export interface Effect {
  hint: string;
  name: ContentType;
}

export enum FormType {
  ElementsCAPTCHAInput = 'elements.captcha_input',
  ElementsInput = 'elements.input',
  ElementsSwitch = 'elements.switch',
}

export enum Country {
  Ng = 'ng',
}

export interface Sandbox {
  account_type: string;
}

export enum InstitutionType {
  BusinessBanking = 'BUSINESS_BANKING',
  PersonalBanking = 'PERSONAL_BANKING',
}
