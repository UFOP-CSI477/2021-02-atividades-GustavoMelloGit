export const convertToBRL = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export function formatDate(date: string) {
  const dArr = date.split('-');
  return dArr[2] + '/' + dArr[1] + '/' + dArr[0].substring(2);
}
