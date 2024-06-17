import Button from '@/common/components/Button';
import { CheckCircleOutlined } from '@ant-design/icons';
import logger from '@logger';
import { Typography } from 'antd';
import React from 'react';

interface IProps {
  code: string;
}

const SuccessSection: React.FC<IProps> = ({ code }) => {
  logger(code);
  return (
    <section className="connect-container flex h-full flex-col text-white">
      <section className="-mt-1 flex h-full flex-col justify-between space-y-9 px-3 py-10">
        <div className="flex flex-col space-y-4 pt-24 text-center">
          <div>
            <CheckCircleOutlined className="text-6xl" />
          </div>
          <Typography.Text className="text-3xl font-medium !text-white">Login successful</Typography.Text>
          <Typography.Text className="text-base text-white">Click on the button below to continue</Typography.Text>
        </div>
        <div className="">
          <Button
            type="primary"
            name="Continue"
            onClick={() => {
              window.parent.postMessage(
                {
                  data: { code },
                  type: 'finver.connect.widget.account_linked',
                },
                '*',
              );
            }}
          />
        </div>
      </section>
    </section>
  );
};

export default SuccessSection;
