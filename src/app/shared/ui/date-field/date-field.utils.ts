export const parseIsoDate = (value: string | undefined): Date | null => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
};

export const formatIsoDate = (value: Date): string => {
  const year = value.getFullYear();

  const month = String(value.getMonth() + 1).padStart(2, '0');

  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
