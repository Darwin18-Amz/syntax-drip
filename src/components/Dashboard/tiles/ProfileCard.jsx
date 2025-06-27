import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

export default function ProfileCard({ profile, onDoubleClick }) {
  return (
    <Card
      hoverable
      onDoubleClick={() => onDoubleClick(profile)}
      className="profile-card"
    >
      <Title level={4} className="profile-name">
        {profile.name}
      </Title>
      <Text type="secondary" className="profile-email">
        {profile.email}
      </Text>
    </Card>
  );
}
