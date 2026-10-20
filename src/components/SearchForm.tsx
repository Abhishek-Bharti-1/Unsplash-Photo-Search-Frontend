import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

interface SearchFormProps {
  isLoading: boolean;
  onSearch: (query: string) => void;
}

export function SearchForm({ isLoading, onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <Search aria-hidden="true" className="search-input-icon" size={21} />
      <label className="sr-only" htmlFor="photo-query">Search photos</label>
      <input
        id="photo-query"
        name="query"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try “mountains”, “architecture”, “coffee”…"
        autoComplete="off"
        required
      />
      <button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? <span className="button-spinner" aria-hidden="true" /> : <Search size={17} />}
        {isLoading ? "Searching" : "Search"}
      </button>
    </form>
  );
}
