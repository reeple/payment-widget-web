import { AuthMethodType, Form, FormatNumberArgs, FormType, Institution } from '../types';
import nookies from 'nookies';
import constants from '@config/constants';
import * as yup from 'yup';

const {
  COOKIES: { institution, maxAge, path, sameSite, secure },
} = constants;

export const getRGBColor = (hex: string, type: string) => {
  const color = hex.replace(/#/g, '');
  // rgb values
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  return `--color-${type}: ${r}, ${g}, ${b};`;
};

export const getAccessibleColor = (hex: string) => {
  const color = hex.replace(/#/g, '');
  // rgb values
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};

export const setCookies = (item: Institution, authMethod: AuthMethodType) => {
  nookies.set(
    null,
    institution,
    JSON.stringify({
      authMethod,
      institution: item._id,
    }),
    {
      maxAge,
      path,
      sameSite,
      secure,
    },
  );
};

type Config = {
  name: string;
  validationType: string;
  validations: {
    params: string[];
    type: string;
  }[];
};

export const dynamicSchema = (schema: any, config: Config) => {
  const { name, validationType, validations = [] } = config;
  if (!(yup as any)[validationType]) {
    return schema;
  }
  let validator = (yup as any)[validationType]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[name] = validator;
  return schema;
};

export const customFieldsMap = (customFields?: Form[]) => {
  return (customFields || []).map((customField) => {
    if (customField.type === FormType.ElementsSwitch) {
      return {
        label: customField.hint,
        name: customField.name,
        placeholder: customField.hint,
        type: customField.contentType,
        validationType: '',
        validations: [],
      };
    }
    return {
      label: customField.hint,
      name: customField.name,
      placeholder: customField.hint,
      type: customField.contentType === 'password' ? 'password' : 'text',
      validationType: 'string',
      validations: [
        {
          params: ['This field is required'],
          type: 'required',
        },
      ],
    };
  });
};

export const formatNumber = ({
  number,
  isCurrency = false,
  currency = 'NGN',
  notation = 'standard',
}: FormatNumberArgs): string => {
  const KOBO = 100;
  const locale = 'en-Gb';
  const numberToFormat = number || 0;
  return isCurrency
    ? new Intl.NumberFormat(locale, {
        currency,
        currencyDisplay: 'narrowSymbol',
        currencySign: 'accounting',
        notation,
        style: 'currency',
      }).format(numberToFormat / KOBO)
    : new Intl.NumberFormat(locale, { notation }).format(numberToFormat);
};
