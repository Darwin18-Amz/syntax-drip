import React from 'react';
import { Form, Button, Space } from 'antd';

export default function SubmitSection({ onCancel }) {
  return (
    <Form.Item>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Space>
    </Form.Item>
  );
}
