import React from 'react';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import constants from '@config/constants';
import routes from '@config/routes';
import { parseCookies } from 'nookies';

interface IProps {
  back?: boolean;
  pageTitle?: React.ReactNode;
  confirmClose?: boolean;
  backPath?: string;
}

const {
  COOKIES: { publicKey },
} = constants;

const PageNav: React.FC<IProps> = ({ back, pageTitle, backPath }) => {
  const router = useRouter();
  const pk = parseCookies()[publicKey];
  return (
    <section className=" flex w-full items-center justify-between">
      {back ? (
        <Button
          type="text"
          onClick={() => (backPath ? router.push(backPath) : router.back())}
          className=" rounded-[50%] border-0 bg-black bg-opacity-20 !text-white hover:bg-white hover:bg-opacity-20  hover:text-white"
          icon={<LeftOutlined className="text-lg" />}
        ></Button>
      ) : (
        <div className="opacity-0">Back</div>
      )}
      {pageTitle ?? null}
      <Button
        type="text"
        className="justify-self-end rounded-[50%] border-0 bg-black bg-opacity-20 !text-white hover:bg-white  hover:bg-opacity-20 hover:text-white"
        icon={<CloseOutlined className="text-lg" />}
        onClick={() => {
          if (window.self !== window.top) {
            window.parent.postMessage(
              {
                data: {},
                type: 'finver.connect.widget.closed',
              },
              '*',
            );
          } else {
            router.push(`${routes.home}?key=${pk}`);
          }
        }}
      ></Button>
    </section>
  );
};

PageNav.defaultProps = {
  back: true,
  confirmClose: false,
};

export default PageNav;
