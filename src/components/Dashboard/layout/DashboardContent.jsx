
import React from 'react';
import { Row, Col, Typography } from 'antd';
import ProfileCard from '../tiles/ProfileCard';

const { Text } = Typography;

const DashboardContent = ({ profiles, onCardClick, onSearch }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        {profiles.length === 0 ? (
          <Col span={24}>
            <Text type="secondary">No profiles yet.</Text>
          </Col>
        ) : (
          profiles.map((profile) => (
            <Col key={profile.id} xs={24} sm={12} md={8}>
              <ProfileCard profile={profile} onClick={() => onCardClick(profile)} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default DashboardContent;
