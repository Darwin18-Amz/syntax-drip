import React, { useEffect, useState, useCallback } from 'react';
import { Button, Table, Modal, Form, message, Input } from 'antd';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../../utils/firebase';
import AddEditForm from '../forms/AddEditForm';
import SubmitSection from '../forms/SubmitSection';

export default function DashboardLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const navigate = useNavigate();

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
      navigate('/login'); // redirects to login page
    } catch (error) {
      message.error('Error during logout');
    }
  };

  const fetchLookups = useCallback(async () => {
    const docSnap = await getDocs(collection(db, 'lookups'));
    docSnap.forEach(doc => {
      const data = doc.data();
      setCollegeOptions(data.colleges || []);
      setStateOptions(data.states || []);
    });
  }, []);

  const fetchProfiles = useCallback(async () => {
    const snapshot = await getDocs(collection(db, 'profiles'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProfiles(data);
    setFilteredProfiles(data);
  }, []);

  useEffect(() => {
    fetchLookups();
    fetchProfiles();
  }, [fetchLookups, fetchProfiles]);

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

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'College', dataIndex: 'collegeName' },
    { title: 'Department', dataIndex: 'department' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <h2 style={{ margin: 0 }}>SD Client Dashboard</h2>
          <h3 style={{ margin: 0, color: '#888' }}>(Internal use only)</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Input
            placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '300px', // or increase more as needed
                borderColor: '#999',
                color: '#333',
            }}
            allowClear
          />
          <Button type="primary" onClick={showModal}>
            Add Client
          </Button>
          <Button type="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProfiles}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Add Client"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <AddEditForm
            form={form}
            stateOptions={stateOptions}
            collegeOptions={collegeOptions}
          />
          <SubmitSection onCancel={handleCancel} />
        </Form>
      </Modal>
    </div>
  );
}
