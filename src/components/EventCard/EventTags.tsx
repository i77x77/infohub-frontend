import type { Tag } from '../../types/types';

interface Props {
  tags: Tag[];
}

export default function EventTags({ tags }: Props) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="tagsWrapper">
      <span className="tagsLabel">Теги:</span>
      <div className="tagsList">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="tagItem"
            style={{
              color: tag.color || '#1677ff',
              borderColor: tag.color || '#1677ff',
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}