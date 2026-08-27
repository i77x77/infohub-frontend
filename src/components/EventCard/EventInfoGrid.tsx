import type { Event } from '../../types/types';

interface Props {
  event: Event;
}

export default function EventInfoGrid({ event }: Props) {
  const fields = [
    { label: 'Тип мероприятия', value: event.type?.name || '—' },
    {
      label: 'Место проведения',
      value: event.location?.city
        ? `${event.location.city}, ${event.location.region}`
        : '—',
    },
    { label: 'Организатор', value: event.organizer?.name || '—' },
    {
      label: 'Дата проведения',
      value: `${new Date(event.dateStart).toLocaleDateString('ru-RU')} г. – ${new Date(event.dateEnd).toLocaleDateString('ru-RU')} г.`,
    },
  ];

  return (
    <div className="infoGrid">
      {fields.map((field, index) => (
        <div className="infoItem" key={index}>
          <span className="label">{field.label}</span>
          <span className="value">{field.value}</span>
        </div>
      ))}
    </div>
  );
}