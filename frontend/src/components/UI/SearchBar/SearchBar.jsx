import React from "react";

import styles from "./SearchBar.module.scss";

import SearchIcon from "../Icons/SearchIcon";
import DarkSearchIcon from "../Icons/DarkSearchIcon";

const SearchBar = ({ themeMode }) => {
  return (
    <div className={styles["search-input"]}>
      <input
        type="search"
        className={`${styles.searchBar} ${
          themeMode ? styles["dark-search"] : undefined
        }`}
        placeholder={`Search`}
      />
      <div className={styles["search-icon"]}>
        {themeMode ? <DarkSearchIcon /> : <SearchIcon />}
      </div>
    </div>
  );
};

export default SearchBar;
