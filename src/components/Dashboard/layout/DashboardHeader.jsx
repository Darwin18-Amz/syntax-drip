
import React from 'react';
import { Row, Col, Button, Input, Space, Typography } from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../utils/firebase';
import '../../../components/Dashboard/styles/layout.css';

const { Title } = Typography;

const DashboardHeader = ({ onAdd }) => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Title level={3}>Syntax Drip</Title>
        <Input.Search
          placeholder="Search profiles..."
          style={{ width: 300, marginTop: 8 }}
          allowClear
          onChange={(e) => onAdd('search', e.target.value)}
        />
      </Col>
      <Col>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => onAdd(null)}
          />
          <Button
            danger
            icon={<LogoutOutlined />}
            size="large"
            onClick={logout}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default DashboardHeader;
