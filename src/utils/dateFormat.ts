const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

export const dateFormat = (date: Date) => dateFormatter.format(date);
