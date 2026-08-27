import { useState } from 'react';

interface Props {
  description: string;
}

export default function EventDescription({ description }: Props) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(!expanded);

  const isLong = description.length > 150;
  const displayText = expanded ? description : description.slice(0, 150);

  return (
    <div className="descriptionWrapper">
      <span className="descriptionLabel">Описание:</span>
      <div className="descriptionText">
        {displayText}
        {isLong && (
          <>
            {!expanded && '...'}
            <span className="descriptionToggle" onClick={toggle}>
              {expanded ? ' Свернуть' : ' Развернуть'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}