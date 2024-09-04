import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./SearchBar.module.scss";

import { getAuthToken } from "../../../utils/auth";
import { searchAction } from "../../../store/search-slice";

import SearchIcon from "../Icons/SearchIcon";
import DarkSearchIcon from "../Icons/DarkSearchIcon";

const SearchBar = ({ themeMode, onSearchBar }) => {
  const [searchResult, setSearchResult] = useState({});
  const dispatch = useDispatch();

  const isSearchList = useSelector((state) => state.search.isSearchList);

  const searchRef = useRef();

  useEffect(() => {
    onSearchBar(searchResult);
  }, [onSearchBar, searchResult]);

  useEffect(() => {
    if (isSearchList) {
      searchRef.current.value = "";
      setSearchResult({});
    }
  }, [isSearchList]);

  const fetchDataHandler = async (e) => {
    const searchData = e.target.value;

    dispatch(searchAction.openSearchList());

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

  return (
    <div className={styles["search-input"]}>
      <input
        ref={searchRef}
        type="search"
        className={`${styles.searchBar} ${
          themeMode ? styles["dark-search"] : ""
        }`}
        placeholder="Search"
        onChange={fetchDataHandler}
      />
      <div className={styles["search-icon"]}>
        {themeMode ? <DarkSearchIcon /> : <SearchIcon />}
      </div>
    </div>
  );
};

export default SearchBar;
