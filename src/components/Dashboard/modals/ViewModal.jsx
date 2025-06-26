import React from 'react';
import { Modal, Form, Row, Col, Divider, Input, DatePicker, Select, Typography } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const ViewModal = ({ open, onCancel, onStartEdit, form, genderOptions }) => {
  return (
    <Modal
      title="Profile Details"
      open={open}
      onCancel={onCancel}
      footer={[
        <button key="edit" className="ant-btn ant-btn-primary" onClick={onStartEdit}>
          Edit
        </button>
      ]}
      width={800}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Form form={form} layout="vertical">
        <Divider>Personal</Divider>
        <Row gutter={16}>
          <Col span={8}><Form.Item name="name" label="Name"><Input readOnly /></Form.Item></Col>
          <Col span={8}><Form.Item name="email" label="Email ID"><Input readOnly /></Form.Item></Col>
          <Col span={8}><Form.Item name="phone" label="Phone"><Input readOnly /></Form.Item></Col>
          <Col span={8}><Form.Item name="dob" label="DOB"><DatePicker style={{ width: '100%' }} disabled /></Form.Item></Col>
          <Col span={8}><Form.Item name="gender" label="Gender">
            <Select disabled>
              {genderOptions.map(g => <Option key={g.value}>{g.label}</Option>)}
            </Select>
          </Form.Item></Col>
          <Col span={8}><Form.Item name="collegeName" label="College"><Input readOnly /></Form.Item></Col>
          <Col span={8}><Form.Item name="city" label="City"><Input readOnly /></Form.Item></Col>
          <Col span={8}><Form.Item name="state" label="State"><Input readOnly /></Form.Item></Col>
          <Col span={8}><Form.Item name="country" label="Country"><Input readOnly /></Form.Item></Col>
        </Row>

        <Divider>Project</Divider>
        <Row gutter={16}>
          <Col span={8}><Form.Item name="projectName" label="Project Name"><Input readOnly /></Form.Item></Col>
          <Col span={8}><Form.Item name="projectType" label="Type"><Input readOnly /></Form.Item></Col>
          <Col span={8}><Form.Item name="requirements" label="Requirements"><Input readOnly /></Form.Item></Col>
          <Col span={24}><Form.Item name="customRequirements" label="Custom Requirements"><TextArea readOnly rows={2} /></Form.Item></Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ViewModal;