import { Form as IForm, FormType } from '@/common/types';
import { Form, Input, Typography } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';

interface IProps {
  control: Control<FieldValues, object>;
  form: IForm;
}

const FormInput: React.FC<IProps> = ({ control, form }) => {
  const [selected, setSelected] = useState(1);
  const { name, contentType, type, hint, maxLength } = form;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  if (type === FormType.ElementsCAPTCHAInput) {
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col items-center justify-center space-y-2">
          {form.value && (
            <figure>
              <Image src={form.value} alt="captcha" width={100} height={50} />
            </figure>
          )}
        </div>
        <Form.Item validateStatus={error ? 'error' : ''} help={error?.message} key={name}>
          <Input
            {...field}
            name={name}
            type={contentType}
            placeholder={hint}
            maxLength={maxLength}
            className="form-input w-full py-2.5 hover:border-dynamic-primary focus:border-dynamic-primary  focus:ring focus:ring-dynamic-primary focus:ring-opacity-50"
          />
        </Form.Item>
      </div>
    );
  }

  if (type === FormType.ElementsSwitch) {
    return (
      <div>
        <div className="flex items-center justify-center">
          <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
            {form.options?.map(({ label: l, value }, idx) => (
              <button
                onClick={() => {
                  setSelected(value);
                }}
                key={value}
                type="button"
                className={`inline-block ${idx === 0 ? 'rounded-l' : 'rounded-r'} ${
                  selected === value ? 'bg-opacity-100' : 'bg-opacity-60'
                }  bg-dynamic-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-dynamic-a11y transition duration-150 ease-in-out hover:bg-dynamic-primary  hover:bg-opacity-90 focus:bg-dynamic-primary focus:outline-none focus:ring-0 active:bg-dynamic-primary`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form.Item
      validateStatus={error ? 'error' : ''}
      help={error?.message}
      key={name}
      label={<Typography.Text>{hint}</Typography.Text>}
    >
      <Input
        {...field}
        name={name}
        type={contentType}
        placeholder={hint}
        maxLength={maxLength}
        className="form-input w-full py-2.5 hover:border-dynamic-primary focus:border-dynamic-primary  focus:ring focus:ring-dynamic-primary focus:ring-opacity-50"
      />
    </Form.Item>
  );
};

export default FormInput;
