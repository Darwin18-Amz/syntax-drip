import React from 'react';
import { Row, Col, Form, Radio, Typography } from 'antd';

const { Text } = Typography;

export default function PresentationSection() {
  return (
    <Form.Item noStyle shouldUpdate>
      {({ getFieldValue }) => (
        <>
          {/* Row 1: Presentation */}
          <Row gutter={16} align="top">
            <Col span={8}>
              <Form.Item
                name="Presentation"
                label="Presentation"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {getFieldValue('Presentation') === 'yes' && (
              <>
                <Col span={8}>
                  <Form.Item
                    name="Presentation Format"
                    label="Presentation Format"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio value="Syntax Drip (Format)">Syntax Drip (Format)</Radio>
                      <Radio value="Client (Format)">Client (Format)</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ paddingTop: 0 }}>
                  <Text>
                    <span style={{ color: '#8B0000' }}>Note:</span>{' '}
                    <span style={{ color: '#003366' }}>
                      Presentation Format should be provided by the Client separately, not in this form.
                    </span>
                  </Text>
                </Col>
              </>
            )}
          </Row>

          {/* Row 2: Documentation */}
          <Row gutter={16} align="top">
            <Col span={8}>
              <Form.Item
                name="Documentation"
                label="Documentation"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {getFieldValue('Documentation') === 'yes' && (
              <>
                <Col span={8}>
                  <Form.Item
                    name="Documentation Format"
                    label="Documentation Format"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio value="Syntax Drip (Format)">Syntax Drip (Format)</Radio>
                      <Radio value="Client (Format)">Client (Format)</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ paddingTop: 0 }}>
                  <Text>
                    <span style={{ color: '#8B0000' }}>Note:</span>{' '}
                    <span style={{ color: '#003366' }}>
                      Documentation Format should be provided by the Client separately, not in this form.
                    </span>
                  </Text>
                </Col>
              </>
            )}
          </Row>
        </>
      )}
    </Form.Item>
  );
}
