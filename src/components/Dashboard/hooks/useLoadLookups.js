// src/components/Dashboard/hooks/useLoadLookups.js
import { useEffect, useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

export default function useLoadLookups() {
  const [stateOptions, setStateOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    const loadLookups = async () => {
      try {
        // STATES
        const states = [
          "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
          "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
          "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
          "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
          "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
        ];
        await setDoc(doc(db, 'lookups', 'states'), { names: states }, { merge: true });
        setStateOptions(states);

        // COLLEGES
        const clgText = await fetch(process.env.PUBLIC_URL + '/colleges.txt').then(res => res.text());
        const colleges = clgText.split('\n').map(x => x.trim()).filter(name => name && name.toLowerCase() !== 'college name');
        await setDoc(doc(db, 'lookups', 'colleges'), { names: colleges }, { merge: true });
        setCollegeOptions(colleges);

        // DEGREES
        const degText = await fetch(process.env.PUBLIC_URL + '/degrees.txt').then(res => res.text());
        const degrees = degText.split('\n').map(x => x.trim()).filter(name => name && name.toLowerCase() !== 'degree');
        await setDoc(doc(db, 'lookups', 'degrees'), { names: degrees }, { merge: true });
        setDegreeOptions(degrees);

        // DEPARTMENTS
        const deptText = await fetch(process.env.PUBLIC_URL + '/departments.txt').then(res => res.text());
        const departments = deptText.split('\n').map(x => x.trim()).filter(name => name && name.toLowerCase() !== 'department');
        await setDoc(doc(db, 'lookups', 'departments'), { names: departments }, { merge: true });
        setDepartmentOptions(departments);

        console.log('✅ All lookups loaded and written');
      } catch (err) {
        console.error('❌ Error loading lookups:', err);
      }
    };

    loadLookups();
  }, []);

  return {
    stateOptions,
    collegeOptions,
    degreeOptions,
    departmentOptions,
  };
}
