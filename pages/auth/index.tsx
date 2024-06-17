import PageHead from '@/common/components/PageHead';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { ReactElement } from 'react';
import nookies from 'nookies';
import constants from '@config/constants';
import mono from '@/services/mono';
import ErrorSection from '@/pages/home/ErrorSection';
import AuthSection from '@/pages/auth/AuthSection';
import AuthLayout from '@/layouts/AuthLayout';
import routes from '@config/routes';
import { BankTypes, Institution } from '@/common/types';
import { getAccessibleColor, getRGBColor } from '@/common/utils';

const {
  COOKIES: { publicKey, institution: institutionCookie },
  MONO_SECRET,
  APP_ID,
} = constants;

const Auth = ({ error, session, institution }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (error) return <ErrorSection error={error} />;
  const primaryColor = getRGBColor(institution.primaryColor, 'primary');
  const a11yColor = getRGBColor(getAccessibleColor(institution.primaryColor), 'a11y');

  return (
    <>
      <PageHead title="Login to your account">
        <style>:root {`{${primaryColor} ${a11yColor}}`}</style>
      </PageHead>
      <AuthSection session={session} institution={institution} />
    </>
  );
};

Auth.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pk = nookies.get(ctx)[publicKey];
  const fi = JSON.parse(nookies.get(ctx)[institutionCookie] || '{}');

  if (!pk) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false,
      },
    };
  }

  const { authMethod, institution } = fi;

  if (!authMethod || !institution) {
    return {
      redirect: {
        destination: `${routes.selectInstitution.index}?type=${BankTypes.personal}`,
        permanent: false,
      },
    };
  }

  try {
    const { data: institutions } = await mono.get('/institutions', { headers: { 'mono-sec-key': MONO_SECRET } });
    const selectedInstitution = (institutions as Institution[]).find(({ _id }) => _id === institution);

    const { data } = await mono.post(
      '/connect/session',
      {
        app: APP_ID,
        auth_method: authMethod,
        institution,
      },
      { headers: { 'mono-sec-key': MONO_SECRET } },
    );

    return {
      props: {
        institution: { ...fi, ...selectedInstitution },
        session: data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch login session',
      },
    };
  }
};

export default Auth;
