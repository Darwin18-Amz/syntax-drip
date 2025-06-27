import React from 'react';
import { Row, Col, Form, Input, Select, Radio } from 'antd';

const { Option } = Select;

export default function ProjectSection() {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="projectName"
            label="Project Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="projectType"
            label="Type"
            rules={[{ required: true, message: 'Select project type' }]}
          >
            <Select
              showSearch
              placeholder="Select project type"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="final_year">Final Year Project</Option>
              <Option value="mini">Mini Project</Option>
              <Option value="internship">Internship Project</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="requirements" label="Requirements">
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Form.Item
          noStyle
          shouldUpdate={(prev, cur) =>
            prev.requirements !== cur.requirements
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('requirements') === 'yes' ? (
              <Col span={24}>
                <Form.Item
                  name="customRequirements"
                  label="Custom Requirements"
                >
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
            ) : null
          }
        </Form.Item>
      </Row>
    </>
  );
}
