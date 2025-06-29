// src/components/Dashboard/layout/DashboardLayout.jsx
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, message, Input } from 'antd';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../../utils/firebase';
import AddEditForm from '../forms/AddEditForm';
import useLoadLookups from '../hooks/useLoadLookups';

export default function DashboardLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { stateOptions, collegeOptions, degreeOptions, departmentOptions } = useLoadLookups();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      message.error('Error during logout');
    }
  };

  const fetchProfiles = async () => {
    const snapshot = await getDocs(collection(db, 'profiles'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProfiles(data);
    setFilteredProfiles(data);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    const filtered = profiles.filter(profile =>
      profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [searchTerm, profiles]);

  const onFinish = async (values) => {
    try {
      await addDoc(collection(db, 'profiles'), values);
      message.success('Profile added successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchProfiles();
    } catch (err) {
      message.error('Error adding profile');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>SD Client Dashboard</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            style={{ width: '250px' }}
          />
          <Button type="primary" onClick={showModal}>Add Client</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <Table
        dataSource={filteredProfiles}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        columns={[]} // Customize as needed
      />

        <Modal
          title="Add Client"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
          width={800} // ⬅️ Doubled the width
        >

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <AddEditForm
            form={form}
            stateOptions={stateOptions}
            collegeOptions={collegeOptions}
            degreeOptions={degreeOptions}
            onCancel={handleCancel}
            departmentOptions={departmentOptions}
          />
        </Form>
      </Modal>
    </div>
  );
}