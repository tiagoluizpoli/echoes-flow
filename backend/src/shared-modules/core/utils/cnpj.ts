const calculateFirstDigit = (onlyNumbersCnpj: string) => {
  const size = 12;
  const numbers = onlyNumbersCnpj.substring(0, size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(onlyNumbersCnpj.charAt(size), 10)) return false;

  return true;
};

const calculateSecondDigit = (onlyNumbersCnpj: string) => {
  const size = 13;
  const numbers = onlyNumbersCnpj.substring(0, size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(onlyNumbersCnpj.charAt(13), 10)) return false;

  return true;
};

export const validateCnpjFormat = (cnpj: string) => {
  if (!cnpj) return false;

  const onlyNumbersCnpj = cnpj.replace(/[^\d]+/g, '');

  if (onlyNumbersCnpj.length !== 14) return false;

  if (new Set(onlyNumbersCnpj).size === 1) return false;

  if (!calculateFirstDigit(onlyNumbersCnpj)) return false;

  if (!calculateSecondDigit(onlyNumbersCnpj)) return false;

  return true;
};
