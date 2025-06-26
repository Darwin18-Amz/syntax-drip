import React from 'react';
import { Modal } from 'antd';
import AddEditForm from '../forms/AddEditForm';

const AddEditModal = ({
  open,
  onCancel,
  form,
  onFinish,
  initialValues,
  options,
  onValuesChange,
  setModalVisible,
}) => {
  return (
    <Modal
      title={initialValues ? 'Edit Profile' : 'Add Profile'}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <AddEditForm
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={initialValues}
        genderOptions={options.genderOptions}
        collegeOptions={options.collegeOptions}
        stateOptions={options.stateOptions}
        knowUsOptions={options.knowUsOptions}
        projectTypeOptions={options.projectTypeOptions}
        setModalVisible={setModalVisible}
      />
    </Modal>
  );
};

export default AddEditModal;
