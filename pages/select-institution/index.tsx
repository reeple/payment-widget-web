import PageHead from '@/common/components/PageHead';
import SelectInstitutionSection from '@/pages/select-institution/SelectInstitutionSection';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import nookies from 'nookies';
import constants from '@config/constants';
import mono from '@/services/mono';
import ErrorSection from '@/pages/home/ErrorSection';

const {
  COOKIES: { publicKey },
  MONO_SECRET,
} = constants;

const SelectInstitution = ({ error, institutions }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (error) return <ErrorSection error={error} />;
  return (
    <>
      <PageHead title="Select Institution" />
      <SelectInstitutionSection institutions={institutions} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pk = nookies.get(ctx)[publicKey];

  if (!pk) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const { data } = await mono.get('/institutions', { headers: { 'mono-sec-key': MONO_SECRET } });
    return {
      props: {
        error: null,
        institutions: data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch financial institutions',
      },
    };
  }
};

export default SelectInstitution;
