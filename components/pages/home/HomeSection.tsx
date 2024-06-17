import PageNav from '@/common/blocks/PageNav';
import Button from '@/common/components/Button';
import { BankTypes } from '@/common/types';
import { EyeInvisibleOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import routes from '@config/routes';
import { Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ErrorSection from './ErrorSection';

interface IProps {
  error: string | null;
  company: {
    name: string;
    logo: string;
    isLive: boolean;
  };
}

const HomeSection: React.FC<IProps> = ({ error, company }) => {
  const router = useRouter();

  if (error) return <ErrorSection error={error} />;

  const HomeItems = [
    {
      description: 'Your information is encrypted using bank grade security.',
      icon: <LockOutlined className="text-xl" />,
      title: 'Secured',
    },
    {
      description: `Your credentials will never be made accessible to ${company.name}`,
      icon: <EyeInvisibleOutlined className="text-xl" />,
      title: 'Private',
    },
    {
      description: `${company.name} or Finver doesn't have access to move your funds.`,
      icon: <SafetyCertificateOutlined className="text-xl" />,
      title: 'Protected',
    },
  ];

  return (
    <section className="connect-container flex h-full flex-col text-white">
      <PageNav back={false} />
      <section className="-mt-1 flex h-full flex-col justify-center space-y-9 px-3">
        <Typography.Title level={2} className="w-[90%] !text-lg !text-white md:!text-2xl">
          {`Allow ${company.name} to access your financial data.`}
        </Typography.Title>
        <div className="ml-2 flex flex-col space-y-7">
          {HomeItems.map((item, index) => (
            <div key={index.toString()} className="flex space-x-4">
              {item.icon}
              <div className="flex flex-col space-y-2">
                <Typography.Text className="text-base font-semibold leading-none text-white">
                  {item.title}
                </Typography.Text>
                <Typography.Text className="text-[15px] font-normal text-white">{item.description}</Typography.Text>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Typography.Text className="mb-3 block text-center text-xs text-gray-300">
            By clicking the button below you agree to our{' '}
            <Link href="#">
              <a className="text-xs !text-gray-200 !underline">T&C</a>
            </Link>
            .
          </Typography.Text>
          <Button
            type="primary"
            name="Click to continue"
            onClick={() =>
              router.push({ pathname: routes.selectInstitution.index, query: { type: BankTypes.personal } })
            }
          />
        </div>
      </section>
    </section>
  );
};

export default HomeSection;
