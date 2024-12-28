import { useEffect, useRef, useState } from "react";
import styles from "./search.module.css";
import { IoIosSearch, IoMdClose } from "react-icons/io";


interface SearchProps {
  onSearch: (query: string) => void;
  onClick: () => void
}

const Search: React.FC<SearchProps> = ({ onSearch, onClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleInputClick = () => {
    setIsExpanded(true); 
    onClick()
  };

  const handleClearInput = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (searchQuery.trim() === "") {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  return (
    <div className={styles.searchContainer} ref={searchRef} onClick={handleInputClick}>
      <IoIosSearch className={styles.searchIcon}/>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
        className={`${styles.searchInput} ${isExpanded ? styles.expanded : ""}`}
      />
      {isExpanded && (
        <IoMdClose className={styles.closeIcon} onClick={handleClearInput}/>
      )}
    </div>
  );
};

export default Search;
