import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('name'); // 'name' | 'ingredient'

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim(), mode);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={mode === 'name' ? 'Search by recipe name...' : 'Search by ingredient...'}
        aria-label="Search recipes"
      />
      <select value={mode} onChange={(e) => setMode(e.target.value)} aria-label="Search by">
        <option value="name">By Name</option>
        <option value="ingredient">By Ingredient</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}
