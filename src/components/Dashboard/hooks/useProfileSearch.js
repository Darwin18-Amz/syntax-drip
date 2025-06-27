export default function useProfileSearch(allProfiles, setProfiles) {
  const onSearch = e => {
    const query = e.target.value.trim().toLowerCase();
    if (query === '') {
      setProfiles(allProfiles);
    } else {
      setProfiles(
        allProfiles.filter(p =>
          p.name.toLowerCase().includes(query) || p.email.toLowerCase().includes(query)
        )
      );
    }
  };

  return { onSearch };
}
