import React from 'react';
import { Form, Button, Space } from 'antd';

export default function SubmitSection() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Form.Item>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button onClick={handlePrint}>Print</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Space>
    </Form.Item>
  );
}
