import React from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';

const AuthModal = ({ open, onCancel, form, onFinish }) => {
  return (
    <Modal
      title="Re-enter Password"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="password"
          label="Current Password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Verify
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthModal;
