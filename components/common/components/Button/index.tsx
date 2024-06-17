import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

const Button: React.FC<ButtonProps> = (props) => {
  const { name, className } = props;
  return (
    <AntButton {...props} className={`finver-btn h-11 w-full text-base font-medium ${className}`}>
      {name}
    </AntButton>
  );
};

Button.defaultProps = {
  className: '',
};

export default Button;
