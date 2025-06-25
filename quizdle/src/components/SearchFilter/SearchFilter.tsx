import React from "react";
import "./SearchFilter.css";

interface SearchFilterProps {
  filterText: string;
  setFilterText: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  filterText,
  setFilterText,
}) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Quiz suchen..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
