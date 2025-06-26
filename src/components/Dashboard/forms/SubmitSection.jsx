import React from 'react';
import { Form, Button, Space } from 'antd';

const SubmitSection = () => {
  return (
    <Form.Item>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button htmlType="button" danger>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Space>
    </Form.Item>
  );
};

export default SubmitSection;
