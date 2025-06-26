import React from 'react';
import { Row, Col, Form, Input, Select, Radio } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const ProjectSection = ({ form, options }) => {
  const { projectTypeOptions } = options;

  return (
    <>
      <h3>Projects</h3>
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
            rules={[{ required: true }]}
          >
            <Select placeholder="Select project type">
              {projectTypeOptions.map(t => (
                <Option key={t.value}>{t.label}</Option>
              ))}
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
          shouldUpdate={(prev, cur) => prev.requirements !== cur.requirements}
        >
          {({ getFieldValue }) =>
            getFieldValue("requirements") === "yes" ? (
              <Col span={24}>
                <Form.Item name="customRequirements" label="Custom Requirements">
                  <TextArea rows={2} />
                </Form.Item>
              </Col>
            ) : null
          }
        </Form.Item>
      </Row>
    </>
  );
};

export default ProjectSection;
