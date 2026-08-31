export const STATUS = {
  DRAFT: {
    title: 'Черновик',
    type: 'warning' as const,
    desc: 'Опубликуйте карточку, чтобы она стала доступна пользователям для чтения',
  },
  PUBLISHED: {
    title: 'Опубликован',
    type: 'info' as const,
    desc: 'Карточка опубликована и доступна другим пользователям для чтения',
  },
};

export const ACCESS_LEVEL = {
  PUBLIC: { title: 'Общедоступный' },
  RESTRICTED: { title: 'Ограниченный' },
};
