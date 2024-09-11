'use client';

import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, DatePicker, Checkbox, Space, Modal } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { DatePickerProps } from 'antd/es/date-picker';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { TextArea } = Input;

interface PropertyFormValues {
  legacy_id: string;
  priority: number;
  title?: string;
  auction_date?: Date;
  is_est_date: boolean;
  city?: string;
  unitno?: string;
  address?: string;
  reserve_price?: number;
  estimate_price?: number;
  size?: number;
  type?: string;
  tenure?: string;
  extra_info?: string;
  bank?: string;
  auction_type?: string;
  owner?: string;
  auctioner?: string;
  auctioner_no?: string;
  remarks?: string;
  ipro: boolean;
  ep: boolean;
  pg?: string;
}

const PropertyForm: React.FC = () => {
    const onFinish: FormProps<PropertyFormValues>['onFinish'] = (values) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed: FormProps<PropertyFormValues>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const [isModalOpen, setIsModalOpen] = useState(false);

      const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

  return (
    <>
     <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form
      name="newlisting"
      size="small"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      style={{ maxWidth: 600 }}
      initialValues={{
        priority: 0,
        is_est_date: false,
        ipro: false,
        ep: false,
      }}
    >
      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: 'Please enter the priority' }]}
        style={{ marginBottom: '5px' }}
      >
        <InputNumber style={{ width: '30px' }} min={0}/>
      </Form.Item>

      <Form.Item
        name="title"
        label="Title"
      >
        <Input />
      </Form.Item>

      <Form.Item label="Auction Date">
        <Space>
          <Form.Item
            name="auction_date"
            noStyle
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>

          <Form.Item
            name="is_est_date"
            valuePropName="checked"
            noStyle
          >
            <Space>
              <Checkbox />
              <span>Estimated?</span>
            </Space>
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="unitno"
        label="Unit Number"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="reserve_price"
        label="Reserve Price"
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        name="estimate_price"
        label="Estimate Price"
      >
        <InputNumber  min={0} />
      </Form.Item>

      <Form.Item
        name="size"
        label="Size"
      >
        <InputNumber  min={0} />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tenure"
        label="Tenure"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="extra_info"
        label="Extra Info"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="bank"
        label="Bank"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="auction_type"
        label="Auction Type"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="owner"
        label="Owner"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="auctioner"
        label="Auctioner"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="auctioner_no"
        label="Auctioner Number"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="remarks"
        label="Remarks"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="ipro"
        label="IPRO"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        name="ep"
        label="EP"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        name="pg"
        label="PG"
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Modal>
    </>
  );
};

export default PropertyForm;
