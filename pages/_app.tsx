import 'styles/output.css';
import 'styles/globals.css';
import 'styles/overrides.scss';
import React, { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import MainLayout from '@/layouts/MainLayout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return <MainLayout>{page}</MainLayout>;
    });

  return getLayout(<Component {...pageProps} />);
}
