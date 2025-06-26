import React from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Checkbox } from 'antd';

const { Option } = Select;

const PersonalSection = ({ form, options }) => {
  const { genderOptions, collegeOptions, stateOptions, knowUsOptions } = options;

  return (
    <>
      <h3>Personal</h3>
      <Row gutter={16}>
        <Col span={8}><Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="email" label="Email ID" rules={[{ type: 'email' }]}><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="useSame" valuePropName="checked"><Checkbox>Same as WhatsApp</Checkbox></Form.Item></Col>
        <Col span={8}><Form.Item name="whatsapp" label="WhatsApp Number" rules={[{ required: true }]}><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="dob" label="DOB" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item></Col>
        <Col span={8}><Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select placeholder="Select gender">
            {genderOptions.map(g => <Option key={g.value}>{g.label}</Option>)}
          </Select>
        </Form.Item></Col>
        <Col span={8}><Form.Item name="collegeName" label="College Name" rules={[{ required: true }]}>
          <Select mode="tags" style={{ width: '100%' }}>
            {collegeOptions.map(c => <Option key={c}>{c}</Option>)}
          </Select>
        </Form.Item></Col>
        <Col span={8}><Form.Item name="collegeLocation" label="College Location"><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="department" label="Department"><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="year" label="Year"><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="address" label="Address"><Input.TextArea rows={2} /></Form.Item></Col>
        <Col span={8}><Form.Item name="city" label="City"><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="state" label="State">
          <Select showSearch placeholder="Select state">
            {stateOptions.map(s => <Option key={s}>{s}</Option>)}
          </Select>
        </Form.Item></Col>
        <Col span={8}><Form.Item name="country" label="Country"><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="knowUs" label="Know us from">
          <Select showSearch>
            {knowUsOptions.map(k => <Option key={k.value}>{k.label}</Option>)}
          </Select>
        </Form.Item></Col>
      </Row>
    </>
  );
};

export default PersonalSection;
