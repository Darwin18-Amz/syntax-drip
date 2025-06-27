// src/components/Dashboard/modals/AuthModal.jsx
import React from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';

export default function AuthModal({ open, onCancel, onAuthFinish, form }) {
  return (
    <Modal
      title="Re-enter Password"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onAuthFinish}>
        <Form.Item
          name="password"
          label="Current Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your current password" />
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
}
