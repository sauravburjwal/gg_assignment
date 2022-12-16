export const formatDate = (date) => {
  const formattedDate =
    date?.toLocaleDateString('en-us', {
      year: 'numeric',
    }) +
    '-' +
    date?.toLocaleDateString('en-us', {
      month: '2-digit',
    }) +
    '-' +
    date?.toLocaleDateString('en-us', {
      day: '2-digit',
    });

  return formattedDate;
};
