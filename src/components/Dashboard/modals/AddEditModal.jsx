// src/components/Dashboard/modals/AddEditModal.jsx
import React from 'react';
import { Modal, Form } from 'antd';
import AddEditForm from '../forms/AddEditForm';

export default function AddEditModal({
  open,
  onCancel,
  onSubmit,
  initialValues,
  isEditing,
  form,
  genderOptions,
  collegeOptions,
  stateOptions,
}) {
  return (
    <Modal
      title={isEditing ? 'Edit Student' : 'Add Student'}
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSubmit(values);
          })
          .catch((info) => {
            console.log('Validation Failed:', info);
          });
      }}
      width={900}
      destroyOnClose
      okText={isEditing ? 'Update' : 'Add'}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', padding: '2rem' }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <AddEditForm
          genderOptions={genderOptions}
          collegeOptions={collegeOptions}
          stateOptions={stateOptions}
        />
      </Form>
    </Modal>
  );
}
