// src/components/Dashboard/modals/ViewModal.jsx
import React from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Divider,
  Button
} from 'antd';

const { Option } = Select;

export default function ViewModal({
  open,
  onCancel,
  onEdit,
  form,
  genderOptions
}) {
  return (
    <Modal
      title="Profile Details"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="edit" type="primary" onClick={onEdit}>
          Edit
        </Button>
      ]}
      width={800}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Form form={form} layout="vertical">
        <Divider>Personal Details</Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="name" label="Name">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="email" label="Email ID">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phone" label="Phone Number">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="useSame" valuePropName="checked">
              <Input readOnly value="Same as WhatsApp" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="whatsapp" label="WhatsApp Number">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="dob" label="DOB">
              <DatePicker style={{ width: '100%' }} disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="gender" label="Gender">
              <Select disabled>
                {genderOptions.map((g) => (
                  <Option key={g}>{g}</Option>
                ))}
                {form.getFieldValue('genderCustom') && (
                  <Option key="custom">
                    {form.getFieldValue('genderCustom')}
                  </Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="collegeName" label="College Name">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="collegeLocation" label="College Location">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="department" label="Department">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="year" label="Year">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item name="address" label="Address">
              <Input.TextArea rows={2} readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="city" label="City">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="state" label="State">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="country" label="Country">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="knowUs" label="Know us from">
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Divider>Project Details</Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="projectName" label="Project Name">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="projectType" label="Type">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="requirements" label="Requirements">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="customRequirements" label="Custom Requirements">
              <Input.TextArea rows={2} readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Divider>Complimentary Details </Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="presentation" label="Presentation">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="presentationFormat" label="Presentation Format">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="documentation" label="Documentation">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="documentationFormat" label="Documentation Format">
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
