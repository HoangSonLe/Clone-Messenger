import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import classNames from "classnames/bind";
import { useRef, useState } from "react";

import styles from "./Search.module.scss";
const cx = classNames.bind(styles);
export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [isFocusInput, setFocusInput] = useState(false);
    const inputRef = useRef();
    return (
        <div className={cx("wrapper")}>
            <div className={cx("btn-back")}>
                {isFocusInput ? (
                    <IconButton size="small">
                        <ArrowBackIcon fontSize="medium" />
                    </IconButton>
                ) : null}
            </div>
            <div className={cx("search")}>
                {!isFocusInput ? (
                    <div
                        className={cx("search-icon")}
                        onClick={() => {
                            inputRef.current.focus();
                            setFocusInput(true);
                        }}
                    >
                        <SearchIcon fontSize="medium" />
                    </div>
                ) : null}

                <div className={cx("search-input")}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        spellCheck={false}
                        onBlur={() => setFocusInput(false)}
                        onFocus={() => setFocusInput(true)}
                        placeholder="Search Messenger"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
