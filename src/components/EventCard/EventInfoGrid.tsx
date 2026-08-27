import type { Event } from '../../types/types';

interface Props {
  event: Event;
}

export default function EventInfoGrid({ event }: Props) {
  return (
    <div className="infoGrid">
      {/* 1-я колонка: заголовки */}
      <div className="infoItem infoLabel">
        <span>Тип мероприятия:</span>
        <span>Организатор:</span>
      </div>

      {/* 2-я колонка: значения */}
      <div className="infoItem infoValue">
        <span>{event.type?.name || '—'}</span>
        <span>{event.organizer?.name || '—'}</span>
      </div>

      {/* 3-я колонка: заголовки */}
      <div className="infoItem infoLabel">
        <span>Место проведения:</span>
        <span>Дата проведения:</span>
      </div>

      {/* 4-я колонка: значения */}
      <div className="infoItem infoValue">
        <span>
          {event.location?.city
            ? `${event.location.city}, ${event.location.region}`
            : '—'}
        </span>
        <span>
          {new Date(event.dateStart).toLocaleDateString('ru-RU')} г. –{' '}
          {new Date(event.dateEnd).toLocaleDateString('ru-RU')} г.
        </span>
      </div>
    </div>
  );
}