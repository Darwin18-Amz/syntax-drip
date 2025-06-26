import { useState } from 'react';

const useProfileSearch = () => {
  const [allProfiles, setAllProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const onSearch = (query) => {
    const q = query.trim().toLowerCase();
    setProfiles(
      q
        ? allProfiles.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.email.toLowerCase().includes(q)
          )
        : allProfiles
    );
  };

  return {
    profiles,
    setProfiles,
    allProfiles,
    setAllProfiles,
    onSearch,
  };
};

export default useProfileSearch;
