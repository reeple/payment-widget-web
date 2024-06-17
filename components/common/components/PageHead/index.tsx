import React from 'react';
import Head from 'next/head';
import constants from '@/common/constants';

const { APP_NAME, PAGE_HEAD, APP_URL } = constants;

interface IProps {
  description?: string;
  keywords?: string[];
  title: string;
  children?: React.ReactNode;
}

const PageHead: React.FC<IProps> = ({ title, description, keywords, children }) => {
  const pageTitle = `${APP_NAME} | ${title}`;
  return (
    <Head>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords?.join(',')} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
      <meta property="og:url" content={APP_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:image" content={PAGE_HEAD.ogImage} />
      <meta property="og:image:alt" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:width" content="1200" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={PAGE_HEAD.twitterUsername} />
      <meta name="twitter:creator" content={PAGE_HEAD.twitterUsername} />
      <meta name="twitter:url" content={APP_URL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={PAGE_HEAD.ogImage} />
      <meta name="twitter:image:alt" content={description} />
      <title>{pageTitle}</title>
      {children}
    </Head>
  );
};

PageHead.defaultProps = {
  description: PAGE_HEAD.pageDescription,
  keywords: PAGE_HEAD.keywords,
};

export default PageHead;
