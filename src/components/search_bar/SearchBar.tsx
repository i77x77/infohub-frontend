import { Input } from 'antd';
import { useDebounce } from '../../hooks/document_hooks/useDebounce';
import { useState, useEffect } from 'react';

const { Search } = Input;

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
}

export function SearchBarDebounce({ value, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(value);
  }

  const debounced = useDebounce(query, 512); // \(*ω*)/━☆

  useEffect(() => {
    if (debounced !== value) {
      onSearch(debounced);
    }
  }, [debounced, value, onSearch]);

  return (
    <Search
      placeholder="Введите название документа..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export function SearchBarEnter({ value, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(value);
  }

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <Search
      placeholder="Введите название документа..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={handleSearchClick}
    />
  );
}
