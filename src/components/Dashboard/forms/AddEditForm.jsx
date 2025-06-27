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
  return (
    <>
      <Divider>Personal</Divider>
      <PersonalSection
        form={form}
        stateOptions={stateOptions}
        collegeOptions={collegeOptions}
      />

      <Divider>Projects</Divider>
      <ProjectSection />

      <Divider>Presentation</Divider>
      <PresentationSection />

      <Divider />
      <SubmitSection onCancel={onCancel} />
    </>
  );
}
