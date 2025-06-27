import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

export default function DashboardTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const students = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(students);
    };

    fetchStudents();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Department',
      dataIndex: 'department'
    },
    {
      title: 'Year',
      dataIndex: 'year'
    }
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
}
