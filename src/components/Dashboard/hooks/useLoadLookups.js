import { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const useLoadLookups = () => {
  const [stateOptions, setStateOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const knowUsOptions = [
    { value: 'friend', label: 'Friend' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'college', label: 'College' },
    { value: 'other', label: 'Other' },
  ];

  const projectTypeOptions = [
    { value: 'final_year', label: 'Final Year Project' },
    { value: 'mini', label: 'Mini Project' },
    { value: 'internship', label: 'Internship Project' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    const loadLookups = async () => {
      try {
        const statesRef = doc(db, 'lookups', 'states');
        const stateSnap = await getDoc(statesRef);
        if (!stateSnap.exists()) {
          const names = [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
            'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
            'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
            'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
            'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
          ];
          await setDoc(statesRef, { names });
          setStateOptions(names);
        } else {
          setStateOptions(stateSnap.data()?.names ?? []);
        }

        const collegesRef = doc(db, 'lookups', 'colleges');
        const clSnap = await getDoc(collegesRef);
        if (!clSnap.exists()) {
          const res = await fetch(process.env.PUBLIC_URL + '/colleges.txt');
          const text = await res.text();
          const names = text.split('\n').map(x => x.trim()).filter(name => name && name.toLowerCase() !== 'college name');
          await setDoc(collegesRef, { names });
          setCollegeOptions(names);
        } else {
          setCollegeOptions(clSnap.data()?.names ?? []);
        }
      } catch (err) {
        console.error('Error loading lookups:', err);
      }
    };

    loadLookups();
  }, []);

  return {
    stateOptions,
    collegeOptions,
    genderOptions,
    knowUsOptions,
    projectTypeOptions
  };
};

export default useLoadLookups;
