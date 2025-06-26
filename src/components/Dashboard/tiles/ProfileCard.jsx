import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const ProfileCard = ({ profile, onClick }) => {
  return (
    <Card hoverable onClick={onClick}>
      <Title level={4}>{profile.name}</Title>
      <Text>{profile.email}</Text>
    </Card>
  );
};

export default ProfileCard;
