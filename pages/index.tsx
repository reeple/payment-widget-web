import PageHead from '@/common/components/PageHead';
import HomeSection from '@/pages/home/HomeSection';
import finver from '@/services/finver';
import { apiRoutes } from '@config/routes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import constants from '@config/constants';
import nookies from 'nookies';

const {
  FINVER_SECRET,
  COOKIES: { maxAge, path, publicKey: pk, sameSite, secure },
} = constants;

const Home = ({ error, company }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <PageHead title="Home" />
      <HomeSection error={error} company={company} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const publicKey = ctx.query?.key as string;
  if (!publicKey) {
    return {
      props: {
        error: 'Public key is required',
        publicKey: null,
      },
    };
  }

  try {
    const { data } = await finver.get(apiRoutes.getCompany.replace('%key%', publicKey), {
      headers: { 'finver-secret': FINVER_SECRET },
    });

    nookies.set(ctx, pk, publicKey, {
      maxAge,
      path,
      sameSite,
      secure,
    });

    return {
      props: {
        company: data.data,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Provide a valid key',
        publicKey: null,
      },
    };
  }
};

export default Home;
