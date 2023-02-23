import React from "react";

import styles from "./SearchBar.module.scss";

import SearchIcon from "../Icons/SearchIcon";

const SearchBar = () => {
  return (
    <div className={styles['search-input']}>
      <input
        type="search"
        className={`${styles.searchBar}`}
        placeholder={`Search`}
      />
      <div className={styles['search-icon']} >
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
