const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const OTP_LENGTH = 6;

const PAGE_HEAD = {
  keywords: [
    'Automation',
    'Money Management',
    'Wealth Management',
    'FinTech',
    'Budget',
    'Interest',
    'Investment',
    'Financial Application',
    'Credit Access',
    'Loan',
    'Savings',
    'Nigeria',
    'Savings Account',
    'Fixed savings',
    'Periodic Savings',
    'Digital Savings in Nigeria',
    'Savings Account in Nigeria',
    'Easy loan access',
    'Credit access',
    'Budget Tracking',
    'Money market',
    'Bonds',
    'Bills',
    'Treasury Bills',
    'Account Management',
  ],
  ogImage: `${APP_URL}/images/og-image.png`,
  pageDescription:
    'Monitor all your account in one place and reach your financial goals with personalized insights, custom budgets and credit access verifications.',
  twitterUsername: '@myfinver',
};

const REGEX = {
  capitalLetters: /[A-Z]+/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  minimum8Characters: /^[a-zA-Z0-9-+_!@#$%^&*.,?]{8,}$/,
  number: /^\d*$/i,
  smallLetters: /[a-z]+/,
  specialSymbol: /[-+_!@#$%^&*.,?]+/,
};

const constants = {
  APP_NAME,
  APP_URL,
  OTP_LENGTH,
  PAGE_HEAD,
  REGEX,
};

export default constants;
