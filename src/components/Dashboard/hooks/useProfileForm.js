import { useState } from 'react';
import dayjs from 'dayjs';
import { db, auth } from '../../../utils/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from 'firebase/firestore';
import {
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { Modal, Form } from 'antd';

const useProfileForm = ({
  stateOptions,
  collegeOptions,
  genderOptions,
  projectTypeOptions,
  knowUsOptions,
  profiles,
  setProfiles,
  allProfiles,
  setAllProfiles
}) => {
  const [viewVisible, setViewVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [viewForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [authForm] = Form.useForm();

  const openViewModal = (p) => {
    setSelectedProfile(p);
    const rawDob = p.dob?.toDate ? p.dob.toDate() : p.dob;
    viewForm.setFieldsValue({
      ...p,
      dob: rawDob ? dayjs(rawDob) : null,
      useSame: p.whatsapp === p.phone,
      genderCustom: genderOptions.find(g => g.value === p.gender) ? undefined : p.gender
    });
    setViewVisible(true);
  };

  const openAddModal = (p) => {
    if (p) {
      setSelectedProfile(p);
      const rawDob = p.dob?.toDate ? p.dob.toDate() : p.dob;
      addForm.setFieldsValue({
        ...p,
        dob: rawDob ? dayjs(rawDob) : null,
        useSame: p.whatsapp === p.phone,
        genderCustom: genderOptions.find(g => g.value === p.gender) ? undefined : p.gender
      });
    } else {
      setSelectedProfile(null);
      addForm.resetFields();
    }
    setAddVisible(true);
  };

  const onStartEdit = () => {
    authForm.resetFields();
    setAuthVisible(true);
  };

  const onAuthFinish = async ({ password }) => {
    try {
      const user = auth.currentUser;
      const cred = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, cred);
      setAuthVisible(false);
      setViewVisible(false);
      openAddModal(selectedProfile);
    } catch (err) {
      Modal.error({ title: 'Auth Failed', content: err.message });
    }
  };

  const onAddFinish = async (values) => {
    const { useSame, dob, gender, genderCustom, ...rest } = values;
    const payload = {
      ...rest,
      dob: dob.toDate(),
      whatsapp: useSame ? values.phone : values.whatsapp,
      gender: gender === 'other' ? genderCustom : gender,
      knowUs: values.knowUs || null,
    };

    if (selectedProfile?.id) {
      await updateDoc(doc(db, 'profiles', selectedProfile.id), payload);
    } else {
      await addDoc(collection(db, 'profiles'), payload);
    }

    const snap = await getDocs(collection(db, 'profiles'));
    const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setAllProfiles(arr);
    setProfiles(arr);

    setAddVisible(false);
    setSelectedProfile(null);
    addForm.resetFields();
  };

  return {
    selectedProfile,
    openViewModal,
    openAddModal,
    onStartEdit,
    viewModalProps: {
      open: viewVisible,
      onCancel: () => setViewVisible(false),
      onStartEdit,
      form: viewForm,
      genderOptions
    },
    authModalProps: {
      open: authVisible,
      onCancel: () => setAuthVisible(false),
      form: authForm,
      onFinish: onAuthFinish
    },
    addModalProps: {
      open: addVisible,
      onCancel: () => setAddVisible(false),
      form: addForm,
      onFinish: onAddFinish,
      initialValues: selectedProfile,
      options: {
        genderOptions,
        collegeOptions,
        stateOptions,
        projectTypeOptions,
        knowUsOptions
      }
    }
  };
};

export default useProfileForm;
