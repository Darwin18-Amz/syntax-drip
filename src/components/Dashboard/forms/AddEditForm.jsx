import React from 'react';
import { Form, Input, DatePicker, Select, Checkbox } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

export default function AddEditForm({ form, onFinish, options, initialValues }) {
  const { genderOptions } = options || { genderOptions: [] };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        dob: initialValues?.dob ? dayjs(initialValues.dob) : null,
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="whatsapp" label="WhatsApp">
        <Input />
      </Form.Item>

      <Form.Item name="useSame" valuePropName="checked">
        <Checkbox>WhatsApp same as phone</Checkbox>
      </Form.Item>

      <Form.Item name="dob" label="Date of Birth">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select placeholder="Select Gender">
          {genderOptions.map(opt => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
          <Option value="others">Others</Option>
        </Select>
      </Form.Item>

      <Form.Item name="genderCustom" label="If Other, specify">
        <Input />
      </Form.Item>

      <Form.Item name="knowUs" label="How did you hear about us?">
        <Input />
      </Form.Item>

      <Form.Item>
        <button type="submit" className="form-button">
          Save Profile
        </button>
      </Form.Item>
    </Form>
  );
}
