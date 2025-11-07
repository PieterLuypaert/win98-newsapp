import React, { createContext, useContext, useEffect, useState } from "react";
import * as Storage from "@core/storage";
import { AuthContext } from "@functional/Auth/AuthContext";

const BookmarksContext = createContext(null);

export const BookmarksProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const userId = user?.id ?? null;

    const [bookmarks, setBookmarks] = useState(() => Storage.getBookmarks(userId));

    useEffect(() => {
        setBookmarks(Storage.getBookmarks(userId));
    }, [userId]);

    useEffect(() => {
        Storage.saveBookmarks(userId, bookmarks);
    }, [userId, bookmarks]);

    function addBookmark(slugOrId) {
        setBookmarks((prev) => {
            if (prev.includes(slugOrId)) return prev;
            return [...prev, slugOrId];
        });
    }

    function removeBookmark(slugOrId) {
        setBookmarks((prev) => prev.filter((s) => s !== slugOrId));
    }

    function isBookmarked(slugOrId) {
        return bookmarks.includes(slugOrId);
    }

    const count = bookmarks.length;

    const value = { bookmarks, addBookmark, removeBookmark, isBookmarked, count };

    return (
        <BookmarksContext.Provider value={value}>
            {children}
        </BookmarksContext.Provider>
    );
};

export const useBookmarks = () => {
    const ctx = useContext(BookmarksContext);
    if (!ctx) throw new Error("useBookmarks must be used within BookmarksProvider");
    return ctx;
};

