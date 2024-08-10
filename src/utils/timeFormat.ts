const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
});

export const timeFormat = (date: Date) => timeFormatter.format(date);
