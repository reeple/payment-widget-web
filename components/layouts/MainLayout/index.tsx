import { Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

interface Iprops {
  children: React.ReactNode;
}

const MainLayout: React.FC<Iprops> = ({ children }) => {
  return (
    <main className="h-screen w-full font-primary antialiased">
      <section className="flex h-full w-full flex-col items-center justify-center space-y-4 ">
        <section className="h-full w-full overflow-hidden  bg-planetary bg-cover bg-bottom bg-no-repeat   sm:max-h-[39rem] sm:max-w-sm sm:rounded-3xl sm:shadow-lg">
          <section className="h-full w-full bg-[#1a2bbe] bg-opacity-50 ">{children}</section>
        </section>
        <div className="hidden items-center !space-x-1 rounded-lg bg-[rgba(14,19,55,.45)] p-2 opacity-50 sm:flex">
          <Typography.Text className=" block text-xs !text-white">Secured by </Typography.Text>
          <Image className="block" alt="white finver logo" src={'/images/logo-white.svg'} height={13} width={64} />
        </div>
      </section>
    </main>
  );
};

export default MainLayout;
