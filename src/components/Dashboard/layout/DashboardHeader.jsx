// src/components/Dashboard/layout/DashboardHeader.jsx
import React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Space } from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

export default function DashboardHeader({ onSearch, onAdd, onLogout }) {
  return (
    <Header className="dash-header">
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>Syntax Drip</Title>
          <Input.Search
            placeholder="Search profiles..."
            onChange={onSearch}
            style={{ width: 300, marginTop: 8 }}
            allowClear
          />
        </Col>
        <Col>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={onAdd}
            />
            <Button
              danger
              icon={<LogoutOutlined />}
              size="large"
              onClick={onLogout}
            />
          </Space>
        </Col>
      </Row>
    </Header>
  );
}
