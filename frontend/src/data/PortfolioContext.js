import React, { createContext, useContext, useEffect, useState } from "react";
import defaults, { mergeContent } from "./defaultContent";

const PortfolioContext = createContext(defaults);
export const usePortfolioContent = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [content, setContent] = useState(defaults);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || ""}/api/content`)
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (data) setContent(mergeContent(data)); })
      .catch(() => {});
  }, []);
  return <PortfolioContext.Provider value={content}>{children}</PortfolioContext.Provider>;
};
