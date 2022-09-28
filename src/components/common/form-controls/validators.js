export const maxLengthCreator = (length) => (value) => {
  if (value && value.length > length)  return 'Че так много-то?';
  return undefined;
}

export const required = (value) => {
  if (value) return undefined;
  return "Напиши хоть че-нибудь!"
}