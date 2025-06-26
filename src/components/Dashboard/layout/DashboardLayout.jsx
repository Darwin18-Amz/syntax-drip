import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, message } from 'antd';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import AddEditForm from '../forms/AddEditForm';
import { extractFormValues } from '../../../utils/extractFormValues';
import { prepareFirestorePayload } from '../../../utils/prepareFirestorePayload';
import './dashboardLayout.css';

const DashboardLayout = () => {
  const [profiles, setProfiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [setLoading] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' }
  ];

  const stateOptions = [
    'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh'
  ].map(state => ({ label: state, value: state }));

  const collegeOptions = [
    'IIT Madras', 'Anna University', 'NIT Trichy'
  ].map(college => ({ label: college, value: college }));

  const knowUsOptions = [
    { label: 'Friend', value: 'friend' },
    { label: 'Instagram', value: 'social' },
    { label: 'College Drive', value: 'college' },
    { label: 'Other', value: 'other' }
  ];

  const projectTypeOptions = [
    { label: 'Mini Project', value: 'mini' },
    { label: 'Major Project', value: 'major' }
  ];

  const options = {
    genderOptions,
    stateOptions,
    collegeOptions,
    knowUsOptions,
    projectTypeOptions
  };

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'profiles'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(data);
    } catch (err) {
      message.error('Failed to fetch profiles');
    }
    setLoading(false);
  };

//   useEffect(() => {
//     fetchProfiles();
//   }, []);
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);


  const handleSubmit = async (values) => {
    const payload = prepareFirestorePayload(values);

    try {
      if (selectedProfile) {
        const ref = doc(db, 'profiles', selectedProfile.id);
        await updateDoc(ref, payload);
        message.success('Profile updated!');
      } else {
        await addDoc(collection(db, 'profiles'), payload);
        message.success('Profile added!');
      }
      setModalOpen(false);
      setSelectedProfile(null);
      fetchProfiles();
    } catch (err) {
      console.error(err);
      message.error('Failed to save profile');
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <h2>Student Profiles</h2>
        <Button type="primary" onClick={() => {
          setSelectedProfile(null);
          setModalOpen(true);
        }}>
          Add Profile
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {profiles.map((profile) => (
          <Col key={profile.id} xs={24} sm={12} md={8}>
            <Card
              title={profile.name}
              actions={[
                <Button type="link" onClick={() => {
                  const values = extractFormValues(profile, genderOptions);
                  setSelectedProfile(values);
                  setModalOpen(true);
                }}>
                  Edit
                </Button>
              ]}
            >
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>College:</strong> {profile.college}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <AddEditForm
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProfile(null);
        }}
        onSubmit={handleSubmit}
        profile={selectedProfile}
        options={options}
      />
    </div>
  );
};

export default DashboardLayout;
