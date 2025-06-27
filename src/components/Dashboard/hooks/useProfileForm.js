import { useState } from 'react';
import { doc, updateDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

export default function useProfileForm(setProfiles, setAllProfiles) {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const onSubmit = async (values, addForm, closeModal) => {
    const {
      useSame,
      dob,
      gender,
      genderCustom,
      ...rest
    } = values;

    const finalGender = gender === 'others' ? genderCustom : gender;
    const payload = {
      ...rest,
      dob: dob.toDate(),
      whatsapp: useSame ? values.phone : values.whatsapp,
      gender: finalGender,
      knowUs: values.knowUs || null,
    };

    if (selectedProfile?.id) {
      await updateDoc(doc(db, 'profiles', selectedProfile.id), payload);
    } else {
      await addDoc(collection(db, 'profiles'), payload);
    }

    const snap = await getDocs(collection(db, 'profiles'));
    const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setProfiles(arr);
    setAllProfiles(arr);
    closeModal();
    setSelectedProfile(null);
    addForm.resetFields();
  };

  return {
    selectedProfile,
    setSelectedProfile,
    onSubmit
  };
}
