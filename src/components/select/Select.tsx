import React, { useState, useEffect, useRef } from "react";
import styles from "./Select.module.scss";

export interface Option {
  label: string | number | JSX.Element;
  value: string | number;
}

type ValueType = string | number | string[] | number[];

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onSelect: (selected: ValueType) => void;
  value: ValueType;
  responsive?: boolean;
  className?: string;
  fitContent?: boolean;
}

const Select = (props: SelectProps) => {
  const {
    options: _options,
    placeholder: _placeholder,
    onSelect = () => {},
    value,
    responsive,
    className,
    fitContent,
  } = props;

  console.log("value", value);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMap, setSelectedMap] = useState<any>({});
  const [options, setOptions] = useState<Option[]>([]);
  const [placeholder, setPlaceholder] = useState<Option | null>(null);
  const [displayValue, setDisplayValue] = useState<
    string | number | JSX.Element
  >("");

  const selectRef = useRef(null);

  const rootRef = useRef(null);

  const handleClose: EventListener = (e) => {
    const dropdown = selectRef.current as HTMLElement | null;
    let _showModal;

    if (!_showModal && (!dropdown || !dropdown.contains(e.target as Node))) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const newOptions = _options.slice();
    // Ensure already selected option(s) is always in the list of result regardless of search string
    const newOptionMap: any = newOptions.reduce(
      (map, { value }) => ({ ...map, [value]: true }),
      {}
    );
    // Avoid duplication though
    const currentSelected = options.filter(
      ({ value }) => selectedMap[String(value)] && !newOptionMap[String(value)]
    );

    setOptions([...currentSelected, ...newOptions]);
    setPlaceholder(
      _placeholder ? { value: "", label: _placeholder || "Select" } : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_options, _placeholder]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClose);
    return () => window.removeEventListener("mousedown", handleClose);
  }, []);

  useEffect(() => {
    const selected = options.filter((option) => value === option.value);
    const _selectedMap = selected.reduce(
      (map, item) => ({ ...map, [item.value]: true }),
      {}
    );
    setSelectedMap(_selectedMap);

    const _displayValue = options.find(
      (option) => option.value === value
    )?.label;
    setDisplayValue(_displayValue || "");
  }, [options, value]);

  const handleOptionClick = (option: Option, e: MouseEvent) => {
    onSelect(option.value);
    setShowDropdown(false);

    e.stopPropagation();
  };

  const handleSelectClick = () => {
    setShowDropdown(!showDropdown);
  };

  const endIcons = (
    <svg
      className={`${styles.arrow} ${showDropdown ? styles.active : ""}`}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <div
        className={[
          styles["select-wrapper"],
          showDropdown ? styles.active : "",
          responsive && styles.responsive,
          fitContent && styles["fit-content"],
          value && styles.selected,
          className,
        ].join(" ")}
        onClick={handleSelectClick}
        ref={selectRef}
        role="list"
      >
        <div className={styles["main-content"]}>
          {displayValue ? (
            <span className={styles["main-text"]}>{displayValue}</span>
          ) : (
            placeholder && (
              <span className={styles.placeholder}>{placeholder.label}</span>
            )
          )}
        </div>

        {endIcons}
        <div
          className={[
            styles.dropdown,
            showDropdown && styles["show-dropdown"],
          ].join(" ")}
          role="list"
          ref={rootRef}
        >
          {[placeholder, ...options].map(
            (option, i, arr) =>
              option && (
                <div
                  className={`${styles.option} ${
                    !option.value && styles.initial
                  } ${option.value === value && styles.active}`}
                  role="listitem"
                  key={i}
                  onClick={(e) =>
                    handleOptionClick(option, e as unknown as MouseEvent)
                  }
                >
                  {option.label}
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Select;
