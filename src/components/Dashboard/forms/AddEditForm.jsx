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

  const darkDividerStyle = {
      borderColor: '#222', // dark gray/black
      borderWidth: 2,
    };


  return (
    <div style={sectionWrapperStyle}>
      <Divider style={darkDividerStyle}>Personal Details</Divider>
      <PersonalSection
        form={form}
        stateOptions={stateOptions}
        collegeOptions={collegeOptions}
        degreeOptions={degreeOptions}
        departmentOptions={departmentOptions}
      />

      <Divider style={darkDividerStyle}>Project Details</Divider>
      <ProjectSection form={form} />

      <Divider style={darkDividerStyle}>Additional Details</Divider>
      <PresentationSection form={form} />

      <Divider style={darkDividerStyle} />
      <SubmitSection />
    </div>
  );
}
