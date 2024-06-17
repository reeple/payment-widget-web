import Button from '@/common/components/Button';
import { Account } from '@/common/types';
import { formatNumber } from '@/common/utils';
import { Drawer, Typography } from 'antd';
import React from 'react';

interface IProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  accounts: Account[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  handleSelectAccount: () => void;
}

const AccountsDrawer: React.FC<IProps> = ({
  setVisible,
  visible,
  accounts,
  selectedIndex,
  setSelectedIndex,
  handleSelectAccount,
  loading,
}) => {
  return (
    <Drawer
      placement="bottom"
      closable={false}
      height={320}
      onClose={() => setVisible(false)}
      open={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Typography.Text className="text-center text-base font-medium text-gray-600">Choose Account</Typography.Text>
        {accounts.map(({ accountNumber, name, balance, currency }, idx) => (
          <div
            onClick={() => setSelectedIndex(idx)}
            role="button"
            key={accountNumber}
            className={`flex w-full justify-between rounded-xl border p-4 transition-all hover:border-dynamic-primary ${
              idx === selectedIndex ? 'ring ring-dynamic-primary ring-opacity-60' : ''
            }`}
          >
            <div className="flex flex-col">
              <Typography.Text className="text-sm text-gray-800">{accountNumber}</Typography.Text>
              <Typography.Text ellipsis className="w-[8rem] text-xs text-gray-400">
                {name}
              </Typography.Text>
            </div>
            <Typography.Text className="text-base font-bold">
              {currency}&nbsp;{formatNumber({ isCurrency: false, number: balance / 100 })}
            </Typography.Text>
          </div>
        ))}
        <Button
          loading={loading}
          onClick={handleSelectAccount}
          htmlType="submit"
          type="primary"
          name="Continue"
          className="!bg-dynamic-primary !text-dynamic-a11y shadow-none transition-all hover:!bg-opacity-90"
        />
      </div>
    </Drawer>
  );
};

export default AccountsDrawer;
