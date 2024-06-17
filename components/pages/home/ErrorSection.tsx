import PageNav from '@/common/blocks/PageNav';
import { WarningOutlined } from '@ant-design/icons';
import React from 'react';

interface IProps {
  error: string;
}

const ErrorSection: React.FC<IProps> = ({ error }) => {
  return (
    <section className="connect-container flex h-full w-full flex-col items-center   bg-red-500 text-white opacity-90 ">
      <PageNav back={false} />
      <section className="flex h-full w-full flex-col items-center justify-center">
        <WarningOutlined className="text-6xl" />
        <div>{error}</div>
      </section>
    </section>
  );
};

export default ErrorSection;
