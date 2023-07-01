import { ChangeEvent, useEffect, useId, useState } from "react";

import { FaMagnifyingGlass, FaSpinner, FaXmark } from "react-icons/fa6";
import useDebounce from "../hooks/useDebounce";

export interface SearchInputProps {
  loading?: boolean;
  onChangeDebounce?: (value: string) => void;
}

function SearchInput({ loading, onChangeDebounce }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const debounceValue = useDebounce(searchValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const id = useId();

  useEffect(() => {
    onChangeDebounce?.(debounceValue);
  }, [debounceValue]);

  return (
    <label
      className="flex relative flex-row items-center rounded-full gap-2.5 ring-2  py-2.5 px-5 focus-within:ring-blue-500 "
      htmlFor={id}
    >
      <FaMagnifyingGlass />
      <input
        value={searchValue}
        id={id}
        type="text"
        className="flex-1 outline-none focus:outline-none"
        placeholder="Search products"
        onChange={handleChange}
      />

      {!!searchValue && !loading && (
        <FaXmark
          className="text-lg cursor-pointer"
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            setSearchValue("");
          }}
        />
      )}
      {loading && (
        <FaSpinner className={"animate-spin absolute right-11 text-blue-800"} />
      )}
    </label>
  );
}

export default SearchInput;
