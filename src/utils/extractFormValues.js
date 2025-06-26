import dayjs from 'dayjs';

export const extractFormValues = (profile, genderOptions) => {
  const rawDob = profile.dob?.toDate ? profile.dob.toDate() : profile.dob;
  const genderList = genderOptions.map(g => g.value);
  return {
    ...profile,
    dob: rawDob ? dayjs(rawDob) : null,
    useSame: profile.whatsapp === profile.phone,
    genderCustom: genderList.includes(profile.gender) ? undefined : profile.gender
  };
};
