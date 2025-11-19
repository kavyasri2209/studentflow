import React, { useState, useEffect } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, delay = 300 }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(value);
    }, delay);

    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="searchbar">
      <input
        className="input"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
