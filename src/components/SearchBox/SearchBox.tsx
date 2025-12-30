import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ query, onSearch }: SearchBoxProps) {
  return (
    <input
      onChange={(e) => onSearch(e.target.value)}
      value={query}
      className={css.input}
      type="text"
      placeholder="Search posts"
    />
  );
}
