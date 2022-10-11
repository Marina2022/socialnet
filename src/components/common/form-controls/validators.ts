type ValidatorType = (value: string) => string | undefined


export const maxLengthCreator = (length: number):ValidatorType => (value) => {
  if (value && value.length > length)  return 'Че так много-то?';
  return undefined;
}

export const required:ValidatorType = (value) => {
  if (value) return undefined;
  return "Напиши хоть че-нибудь!"
}