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
  degreeOptions,
  departmentOptions
}) {
  const sectionWrapperStyle = {
    margin: 0,
    padding: 0,
  };

  const dividerStyle = {
    textAlign: 'left',
    margin: '16px 0 8px 0',
    padding: 0,
    fontWeight: 'bold',
    fontSize: '16px',
  };

  return (
    <div style={sectionWrapperStyle}>
      <Divider orientation="left" plain style={dividerStyle}>Personal Details</Divider>
      <PersonalSection
        form={form}
        stateOptions={stateOptions}
        collegeOptions={collegeOptions}
        degreeOptions={degreeOptions}
        departmentOptions={departmentOptions}
      />

      <Divider orientation="left" plain style={dividerStyle}>Project Details</Divider>
      <ProjectSection form={form} />

      <Divider orientation="left" plain style={dividerStyle}>Presentation Details</Divider>
      <PresentationSection form={form} />

      <SubmitSection />
    </div>
  );
}
