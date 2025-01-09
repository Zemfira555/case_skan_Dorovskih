import React from "react";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

const Search: React.FC = () => {
  const [searchResultVisible, setSearchResultVisible] =
    React.useState<boolean>(false);

  return searchResultVisible ? (
    <SearchResult />
  ) : (
    <SearchForm setSearchResultVisible={setSearchResultVisible} />
  );
};

export default Search;
