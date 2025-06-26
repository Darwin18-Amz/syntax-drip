
export const prepareFirestorePayload = (values) => {
  const {
    useSame,
    dob,
    gender,
    genderCustom,
    phone,
    whatsapp,
    knowUs,
    ...rest
  } = values;

  const finalGender = gender === 'others' ? genderCustom : gender;

  return {
    ...rest,
    dob: dob.toDate(), // Convert dayjs to JS Date
    phone,
    whatsapp: useSame ? phone : whatsapp,
    gender: finalGender,
    knowUs: knowUs || null
  };
};
