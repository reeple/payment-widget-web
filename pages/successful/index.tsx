import PageHead from '@/common/components/PageHead';
import SuccessSection from '@/pages/successful/SuccessSection';
import routes from '@config/routes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

const Successful = ({ code }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <PageHead title="Successful" />
      <SuccessSection code={code} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const code = ctx.query?.code as string;

  if (!code) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false,
      },
    };
  }

  return {
    props: {
      code,
    },
  };
};

export default Successful;
