import React from 'react';
import { Row, Col, Form, Radio } from 'antd';

export default function PresentationSection() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item name="presentation" label="Presentation">
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="presentationFormat" label="Presentation Format">
          <Radio.Group>
            <Radio value="readymade">ReadyMade</Radio>
            <Radio value="custom">Custom</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="documentation" label="Documentation">
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="documentationFormat" label="Documentation Format">
          <Radio.Group>
            <Radio value="readymade">ReadyMade</Radio>
            <Radio value="custom">Custom</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  );
}
