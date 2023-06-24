import React, { useCallback, useEffect, useState } from "react";

import styles from "./SearchBar.module.scss";

import { getAuthToken } from "../../../utils/auth";

import SearchIcon from "../Icons/SearchIcon";
import DarkSearchIcon from "../Icons/DarkSearchIcon";

const SearchBar = ({ themeMode, onSearchBar }) => {
  const [searchResult, setSearchResult] = new useState([]);

  //^ whenever there is a change inside the search input then this function will run.
  const fetchDataHandler = async (e) => {
    const searchData = e.target.value;

    if (!searchData) {
      setSearchResult([]);
      return;
    }

    const getSearchResult = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/search/get-all-search-for-admin-teacher`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchData }),
      }
    );

    if (getSearchResult.status === 401 || getSearchResult.status === 403) {
      const response = await getSearchResult.json();
      console.log(response);
      throw new Error(response.message);
    }

    if (!getSearchResult.ok) {
      console.log(await getSearchResult.json());
      throw new Error("Something went wrong");
    }

    const response = await getSearchResult.json();
    setSearchResult(response);
  };

  useEffect(() => {
    onSearchBar(searchResult);
  }, [setSearchResult, fetchDataHandler]);

  return (
    <div className={styles["search-input"]}>
      <input
        type="search"
        className={`${styles.searchBar} ${
          themeMode ? styles["dark-search"] : undefined
        }`}
        placeholder={`Search`}
        onChange={fetchDataHandler}
      />
      <div className={styles["search-icon"]}>
        {themeMode ? <DarkSearchIcon /> : <SearchIcon />}
      </div>
    </div>
  );
};

export default SearchBar;
