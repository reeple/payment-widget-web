import PageNav from '@/common/blocks/PageNav';
import { BankTypes, Institution } from '@/common/types';
import routes from '@config/routes';
import { Avatar, Button, Drawer, Input, List, Tabs, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { CloseOutlined, DesktopOutlined, MobileOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import constants from '@config/constants';
import { setCookies } from '@/common/utils';

const {
  COOKIES: { publicKey },
} = constants;
interface IProps {
  institutions: Institution[];
}

const institutionTabs = [
  {
    key: BankTypes.personal,
    label: 'Personal',
  },
  {
    key: BankTypes.business,
    label: 'Business',
  },
];

const SelectInstitutionSection: React.FC<IProps> = ({ institutions }) => {
  const router = useRouter();
  const type = router.query.type;
  const [search, setSearch] = React.useState('');
  const pk = parseCookies()[publicKey];

  const filteredData = useMemo(() => {
    return institutions.filter((item) => item.type === type && item.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, type, institutions]);

  const [visible, setVisible] = React.useState(false);
  const [selectedInstitution, setSelectedInstitution] = React.useState<Institution | null>(null);

  const handleClose = () => setVisible(false);

  return (
    <section className="select-institution connect-container relative h-full w-full ">
      <Drawer
        placement="bottom"
        closable={false}
        height={350}
        onClose={handleClose}
        open={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        {selectedInstitution && (
          <section>
            <div className="flex w-full  justify-between">
              <div className="opacity-0">Back</div>
              <Image alt="institution-logo" src={selectedInstitution.icon} width={48} height={48} priority={true} />
              <Button
                type="text"
                className=" h-7 w-7 rounded-[50%] border-0 bg-black bg-opacity-[3%] !text-gray-700  hover:bg-black  hover:bg-opacity-10 hover:text-gray-700"
                icon={<CloseOutlined className="text-sm" />}
                onClick={handleClose}
              ></Button>
            </div>
            <Typography.Text className="mt-4 block text-center text-base font-medium text-gray-600">
              Choose log in method
            </Typography.Text>
            <List
              className="connect-auth-list mt-4"
              size="default"
              dataSource={selectedInstitution.auth_methods}
              renderItem={(auth) => (
                <List.Item
                  className="flex items-center"
                  onClick={() => {
                    setCookies(selectedInstitution, auth.type);
                    router.push(routes.auth);
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          alignItems: 'center',
                          background: selectedInstitution.primaryColor,
                          display: 'flex',
                          height: 40,
                          justifyContent: 'center',
                          width: 40,
                        }}
                        src={auth.type === 'mobile_banking' ? <MobileOutlined /> : <DesktopOutlined />}
                      />
                    }
                    title={
                      <Typography.Text className="!mb-0 text-sm font-semibold !leading-3 text-gray-700">
                        Login with {auth.name}
                      </Typography.Text>
                    }
                    description={
                      <Typography.Text className="text-xs !leading-tight text-gray-700">{`Click here to use the credentials you use with your ${
                        selectedInstitution.name
                      } ${auth.name.toLowerCase()} `}</Typography.Text>
                    }
                  />
                </List.Item>
              )}
            />
          </section>
        )}
      </Drawer>
      <PageNav
        pageTitle={<p className="text-base font-medium text-white">Choose your bank</p>}
        backPath={`${routes.home}?key=${pk}`}
      />
      <Input
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-input search-input my-7 mb-3  w-full py-2.5  text-[15px] text-white placeholder-white shadow-none hover:border-white hover:border-opacity-30 focus:border-white focus:border-opacity-30 focus:outline-none sm:leading-5"
        placeholder="Search for your bank"
      />
      <Tabs
        className="connect-tabs"
        defaultActiveKey={BankTypes.personal}
        centered
        moreIcon={null}
        items={institutionTabs}
        onChange={(k) => router.push({ pathname: routes.selectInstitution.index, query: { type: k } })}
      />
      <section className="h-full">
        <section className="h-full w-full rounded-lg border-[1px] border-white border-opacity-20 bg-white bg-opacity-10 pb-40 text-white transition duration-300 ease-out">
          <List
            className="bank-list connect-list h-full !overflow-y-scroll"
            size="default"
            dataSource={filteredData}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setSelectedInstitution(item);
                  if (item.auth_methods.length > 1) return setVisible(true);
                  setCookies(item, item.auth_methods[0].type);
                  router.push(routes.auth);
                }}
              >
                <List.Item.Meta avatar={<Avatar src={item.icon} />} />
                <Typography.Text className="text-base text-white">{item.name}</Typography.Text>
              </List.Item>
            )}
          />
        </section>
      </section>
    </section>
  );
};

export default SelectInstitutionSection;
