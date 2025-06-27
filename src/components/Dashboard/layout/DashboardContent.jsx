// src/components/Dashboard/layout/DashboardContent.jsx
import React from 'react';
import { Layout, Row, Col, Card, Typography } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function DashboardContent({ profiles, onView }) {
  return (
    <Content style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {profiles.length === 0 ? (
          <Col span={24}>
            <Text type="secondary">No profiles yet.</Text>
          </Col>
        ) : (
          profiles.map((profile) => (
            <Col key={profile.id} xs={24} sm={12} md={8}>
              <Card
                hoverable
                onDoubleClick={() => onView(profile)}
              >
                <Title level={4}>{profile.name}</Title>
                <Text>{profile.email}</Text>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Content>
  );
}
