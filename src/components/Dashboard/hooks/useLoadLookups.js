import { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function useLoadLookups() {
  const [stateOptions, setStateOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);

  useEffect(() => {
    const loadLookups = async () => {
      try {
        // Load States
        const statesRef = doc(db, 'lookups', 'states');
        const stateSnap = await getDoc(statesRef);
        if (!stateSnap.exists()) {
          const names = [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
            "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
            "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
            "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
            "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
          ];
          await setDoc(statesRef, { names });
          setStateOptions(names);
        } else {
          const data = stateSnap.data();
          setStateOptions(data?.names ?? []);
        }

        // Load Colleges
        const collegesRef = doc(db, 'lookups', 'colleges');
        const clSnap = await getDoc(collegesRef);
        if (!clSnap.exists()) {
          const res = await fetch(process.env.PUBLIC_URL + '/colleges.txt');
          const text = await res.text();
          const names = text
            .split('\n')
            .map(x => x.trim())
            .filter(name => name && name.toLowerCase() !== 'college name');
          await setDoc(collegesRef, { names });
          setCollegeOptions(names);
        } else {
          const data = clSnap.data();
          setCollegeOptions(data?.names ?? []);
        }
      } catch (err) {
        console.error('Error loading lookups:', err);
      }
    };

    loadLookups();
  }, []);

  return { stateOptions, collegeOptions };
}
