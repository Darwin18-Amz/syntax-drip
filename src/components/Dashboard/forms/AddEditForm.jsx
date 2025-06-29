// src/components/Dashboard/forms/AddEditForm.jsx
import React from 'react';
import { Divider } from 'antd';
import PersonalSection from './PersonalSection';
import ProjectSection from './ProjectSection';
import PresentationSection from './PresentationSection';
import SubmitSection from './SubmitSection';

export default function AddEditForm({
  form,
  stateOptions,
  collegeOptions,
  onCancel,
}) {
  const darkDividerStyle = {
    borderColor: '#222', // dark gray/black
    borderWidth: 1,
  };

  return (
    <>
      <Divider style={darkDividerStyle}>Personal Details</Divider>
      <PersonalSection
        form={form}
        stateOptions={stateOptions}
        collegeOptions={collegeOptions}
      />

      <Divider style={darkDividerStyle}>Project Details</Divider>
      <ProjectSection />

      <Divider style={darkDividerStyle}>Additional Details</Divider>
      <PresentationSection />

      <Divider style={darkDividerStyle} />
      <SubmitSection onCancel={onCancel} />
    </>
  );
}
