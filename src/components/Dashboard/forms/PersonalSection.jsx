import React from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Checkbox } from 'antd';

const { Option } = Select;

export default function PersonalSection({ form, stateOptions, collegeOptions }) {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="email"
          label="Email ID"
          rules={[{ type: 'email' }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="useSame" valuePropName="checked">
          <Checkbox>Same as WhatsApp</Checkbox>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="whatsapp"
          label="WhatsApp Number"
          rules={[{ required: true }]}
        >
          <Input disabled={form.getFieldValue('useSame')} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="dob"
          label="DOB"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Select gender' }]}
        >
          <Select placeholder="Select gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, cur) => prev.gender !== cur.gender}>
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'others' ? (
              <Form.Item
                name="genderCustom"
                label="Please specify"
                rules={[{ required: true, message: 'Enter custom gender' }]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="collegeName"
          label="College Name"
          rules={[{ required: true }]}
        >
          <Select
            mode="tags"
            showSearch
            style={{ width: '100%' }}
            placeholder="Type or select"
            dropdownMatchSelectWidth={false}
            optionFilterProp="value"
            filterOption={(input, option) => {
              const normalize = str =>
                String(str).toLowerCase().replace(/[^a-z0-9]/g, '');
              return normalize(option?.value).includes(normalize(input));
            }}
          >
            {collegeOptions.map(c => (
              <Option key={c} value={c}>
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{c}</div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="collegeLocation" label="College Location">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="department" label="Department">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="year" label="Year">
          <Input />
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item name="address" label="Address">
          <Input.TextArea rows={2} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="city" label="City">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="state" label="State">
          <Select
            showSearch
            placeholder="Select state"
            optionFilterProp="children"
            filterOption={(input, opt) =>
              opt.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {stateOptions.map(s => (
              <Option key={s}>{s}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="country" label="Country">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="knowUs" label="Know us from">
          <Select
            showSearch
            placeholder=""
            optionFilterProp="children"
            filterOption={(input, opt) =>
              opt.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="friend">Friend</Option>
            <Option value="social_media">Social Media</Option>
            <Option value="college">College</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
}
