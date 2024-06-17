import PageNav from '@/common/blocks/PageNav';
import Button from '@/common/components/Button';
import { Session, BankTypes, Institution, Form as IForm, AuthMethodType } from '@/common/types';
import { Avatar, Drawer, Form, Typography } from 'antd';
import React, { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import { WarningOutlined } from '@ant-design/icons';
import { customFieldsMap, dynamicSchema, formatNumber, setCookies } from '@/common/utils';
import { useRouter } from 'next/router';
import routes from '@config/routes';
import FormInput from '@/common/blocks/FormInput';

interface IProps {
  session: Session;
  institution: Institution;
}

type Res = { data: { responseCode: 99 | 101 | 102; data: any } };

type Account = {
  accountNumber: string;
  name: string;
  type: string;
  currency: string;
  status: string;
  balance: number;
};

type TwoFA = {
  title: string;
  form: IForm[];
};

const FIRST_BANK_CODE = '011';
const LOGIN_TYPE = {
  [BankTypes.personal]: 'Personal',
  [BankTypes.business]: 'Business',
};

const AuthSection: React.FC<IProps> = ({ session, institution }) => {
  const [authMethod, setAuthMethod] = useState(institution.authMethod);
  const [visible, setVisible] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [twoFa, setTwoFa] = useState<TwoFA | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const ui =
    institution.bank_code === FIRST_BANK_CODE && authMethod === AuthMethodType.InternetBanking
      ? { ui: institution.ui }
      : institution.auth_methods.find((auth) => auth.type === authMethod);

  const dynamicFormData = customFieldsMap(ui?.ui.form);
  const customFieldsSchema = dynamicFormData.reduce(dynamicSchema, {});

  const dynamicValidationSchema = yup.object().shape(customFieldsSchema);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(dynamicValidationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    try {
      const {
        data: {
          data: { data, responseCode },
        },
      } = await axios.post<Res>('/api/connect', {
        ...payload,
        sessionId: session.id,
      });
      if (responseCode === 101) {
        setAccounts(data);
        return setAccountModal(true);
      }
      if (responseCode === 102) {
        return setTwoFa(data);
      }
      return await router.push({ pathname: routes.success, query: { code: data.code } });
    } catch (e) {
      const x = e as AxiosError<{ message: string }>;
      if (x.response && x.response?.status < 500) {
        setError(x.response.data.message);
      } else {
        setError('Invalid Credentials');
      }
      setVisible(true);
      return e;
    }
  };

  const handleSelectAccount = async () => {
    try {
      const {
        data: {
          data: { data, responseCode },
        },
      } = await axios.post<Res>('/api/commit', {
        account: selectedIndex.toString(),
        sessionId: session.id,
      });

      setAccountModal(false);
      if (responseCode === 101) {
        setAccounts(data);
        return setAccountModal(true);
      }
      if (responseCode === 102) {
        return setTwoFa(data);
      }
      return await router.push({ pathname: routes.success, query: { code: data.code } });
    } catch (e) {
      const x = e as AxiosError<{ message: string }>;
      if (x.response && x.response?.status < 500) {
        setError(x.response.data.message);
      } else {
        setError('Invalid Selection');
      }
      setVisible(true);
      return e;
    } finally {
      setLoading(false);
    }
  };

  const dynamiTwoFa = customFieldsMap(twoFa?.form);
  const twoFaFields = dynamiTwoFa.reduce(dynamicSchema, {});

  const twoFaSchema = yup.object().shape(twoFaFields);

  const {
    control: twoFaControl,
    handleSubmit: twoFaSubmit,
    formState: { isSubmitting: twoFaLoading },
    reset: twoFaReset,
  } = useForm({
    resolver: yupResolver(twoFaSchema),
  });

  const twoFaOnSubmit: SubmitHandler<FieldValues> = async (payload) => {
    try {
      const {
        data: {
          data: { data, responseCode },
        },
      } = await axios.post<Res>('/api/commit', {
        ...payload,
        sessionId: session.id,
      });
      if (responseCode === 101) {
        setAccounts(data);
        return setAccountModal(true);
      }
      if (responseCode === 102) {
        return setTwoFa(data);
      }
      return await router.push({ pathname: routes.success, query: { code: data.code } });
    } catch (e) {
      const x = e as AxiosError<{ message: string }>;
      if (x.response && x.response?.status < 500) {
        setError(x.response.data.message);
      } else {
        setError('Invalid Credentials');
      }
      setVisible(true);
      return e;
    }
  };

  return (
    <section className="relative h-full w-full bg-white ">
      <Drawer
        placement="bottom"
        closable={false}
        height={280}
        onClose={() => setVisible(false)}
        open={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <WarningOutlined className="text-4xl text-red-500" />
          <Typography.Text>{error}</Typography.Text>
          {institution.auth_methods.length > 1 &&
            institution.auth_methods
              .filter((auth) => auth.type !== authMethod)
              .map(({ type, _id }) => (
                <Button
                  key={_id}
                  onClick={() => {
                    setVisible(false);
                    setAuthMethod(type);
                    setCookies(institution, type);
                    setError('');
                    reset();
                    twoFaReset();
                  }}
                  htmlType="submit"
                  type="primary"
                  name={`Try again with ${type.replace('_', ' ')}`}
                  className="!bg-dynamic-primary !text-dynamic-a11y shadow-none transition-all hover:!bg-opacity-90"
                />
              ))}
          <Button
            onClick={() => {
              setVisible(false);
              setError('');
              reset();
              twoFaReset();
            }}
            htmlType="submit"
            type="primary"
            name={`Retry with ${authMethod.replace('_', ' ')}`}
            className="!bg-gray-200 !text-gray-900 shadow-none transition-all"
          />
        </div>
      </Drawer>
      {accounts ? (
        <Drawer
          placement="bottom"
          closable={false}
          height={320}
          onClose={() => setAccountModal(false)}
          open={accountModal}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <Typography.Text className="text-center text-base font-medium text-gray-600">
              Choose Account
            </Typography.Text>
            {accounts.map(({ accountNumber, name, balance, currency }, idx) => (
              <div
                onClick={() => setSelectedIndex(idx)}
                role="button"
                key={accountNumber}
                className={`flex w-full justify-between rounded-xl border p-4 transition-all hover:border-dynamic-primary ${
                  idx === selectedIndex ? 'ring ring-dynamic-primary ring-opacity-60' : ''
                }`}
              >
                <div className="flex flex-col">
                  <Typography.Text className="text-sm text-gray-800">{accountNumber}</Typography.Text>
                  <Typography.Text ellipsis className="w-[8rem] text-xs text-gray-400">
                    {name}
                  </Typography.Text>
                </div>
                <Typography.Text className="text-base font-bold">
                  {currency}&nbsp;{formatNumber({ isCurrency: false, number: balance / 100 })}
                </Typography.Text>
              </div>
            ))}
            <Button
              loading={loading}
              onClick={handleSelectAccount}
              htmlType="submit"
              type="primary"
              name="Continue"
              className="!bg-dynamic-primary !text-dynamic-a11y shadow-none transition-all hover:!bg-opacity-90"
            />
          </div>
        </Drawer>
      ) : null}
      <div className="bg-dynamic-primary pb-10 text-dynamic-a11y">
        <section className="connect-container">
          <PageNav
            pageTitle={
              <p className="text-base font-medium text-white">
                Login{' '}
                <span className="ml-2 rounded-md bg-gray-900 bg-opacity-10 py-1 px-2.5 text-sm">
                  {LOGIN_TYPE[institution.type]}
                </span>
              </p>
            }
          />
          <div className="absolute right-[50%] top-[10%] translate-x-[50%]">
            <Avatar className="border-2 border-white shadow-md" size={70} src={institution.icon} />
          </div>
        </section>
      </div>
      <section className="connect-container flex h-full w-full flex-col bg-dynamic-primary bg-opacity-5 pt-10">
        {!twoFa ? (
          <>
            <Typography.Text className="pt-4 pb-6 text-center text-lg font-semibold">{ui?.ui.title}</Typography.Text>
            {ui && (
              <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                <div className="flex flex-col space-y-4">
                  {ui?.ui.form.map((form) => (
                    <FormInput form={form} control={control} key={form.name} />
                  ))}
                  <Button
                    loading={isSubmitting}
                    htmlType="submit"
                    type="primary"
                    name="Login"
                    className="!bg-dynamic-primary !text-dynamic-a11y shadow-none transition-all hover:!bg-opacity-90"
                  />
                </div>
              </Form>
            )}
            {institution.forgotPasswordLink && (
              <div className="py-2">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="transition-all hover:text-dynamic-primary"
                  href={institution.forgotPasswordLink}
                >
                  Reset Password
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <Typography.Text className="pt-4 pb-6 text-center text-lg font-semibold">{twoFa.title}</Typography.Text>
            <Form onFinish={twoFaSubmit(twoFaOnSubmit)} layout="vertical">
              <div className="flex flex-col space-y-4">
                {twoFa.form.map((form) => (
                  <FormInput form={form} control={twoFaControl} key={form.name} />
                ))}
                <Button
                  loading={twoFaLoading}
                  htmlType="submit"
                  type="primary"
                  name="Continue"
                  className="!bg-dynamic-primary !text-dynamic-a11y shadow-none transition-all hover:!bg-opacity-90"
                />
              </div>
            </Form>
          </>
        )}
      </section>
    </section>
  );
};

export default AuthSection;
