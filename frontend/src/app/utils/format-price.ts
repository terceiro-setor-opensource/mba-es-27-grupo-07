export const formatPrice = (price: number) => {
  try {
    return price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  } catch (error) {
    console.error('Error formatting price: ', error);

    return '';
  }
};
