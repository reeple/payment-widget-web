const ENVIRONMENT = {
  development: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
  production: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
};

const SCREEN_SIZES = {
  large: 1024,
  medium: 768,
  small: 640,
  xlarge: 1280,
  xxlarge: 1536,
  xxxlarge: 1600,
};

const SOCIAL_MEDIA = {
  facebook: 'https://www.facebook.com/Myfinver-109115895110180',
  instagram: 'https://www.instagram.com/myfinver',
  twitter: 'https://twitter.com/myfinver',
};

const PUBLIC_KEYS = {
  flutterwave: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
  mono: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
  paystack: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
};

const API = {
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  monoBaseUrl: process.env.NEXT_PUBLIC_MONO_BASE_URL as string,
  timeout: 60000,
};

const CONFIG_TEXTS = {
  aborted: 'ECONNABORTED',
  embarassing: 'Oops!. This is embarassing.',
  error: 'Error',
  errorIcon: '🚫',
  networkError: 'Network Error',
  noNetwork: 'Please check your internet connection and try again',
  requestTimeout: 'Request timed out',
  somethingWentWrong: 'Something went wrong from our end. You can report this error to us or try again later.',
  validationError: 'Validation error',
  validationIcon: '❌',
};

const KOBO = 100;

const FINVER_SECRET = process.env.FINVER_SECRET as string;

const MONO_SECRET = process.env.MONO_SECRET_KEY as string;

const APP_ID = process.env.APP_ID as string;

const COOKIES = {
  institution: 'finver-institution',
  maxAge: 3600,
  path: '/',
  publicKey: 'finver-public-key',
  sameSite: 'none',
  secure: true,
};

const constants = {
  API,
  APP_ID,
  CONFIG_TEXTS,
  COOKIES,
  ENVIRONMENT,
  FINVER_SECRET,
  KOBO,
  MONO_SECRET,
  PUBLIC_KEYS,
  SCREEN_SIZES,
  SOCIAL_MEDIA,
};

export default constants;
