import React from "react";
import "./Searchbar.css";

const Searchbar = ({ value, onChange, placeholder = "Search articles..." }) => {
    return (
        <div className="searchbar-container">
            <input
                type="text"
                className="news-search"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label="Search articles"
            />
        </div>
    );
};

export default Searchbar;