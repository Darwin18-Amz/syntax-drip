import React, { useEffect, useState, useCallback } from 'react';
import { Button, Table, Modal, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import AddEditForm from '../forms/AddEditForm';
import SubmitSection from '../forms/SubmitSection';


export default function DashboardLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [profiles, setProfiles] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
  }, []);

  useEffect(() => {
    fetchLookups();
    fetchProfiles();
  }, [fetchLookups, fetchProfiles]);

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
    // Add other columns as needed
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Add Student
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={profiles}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Add Student"
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
