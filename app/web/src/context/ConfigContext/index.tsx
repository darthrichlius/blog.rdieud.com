import { createContext, useContext, useMemo, useState } from "react";
import { useMatches } from "react-router-dom";
import PageParams from "../../config/_params/pages";

export const ConfigContext = createContext({
  pages: PageParams,
  matchRoute: {},
  matchPage: {},
});

export default function ConfigContextProvide({ children }) {
  const matches = useMatches();
  const route = matches?.at(-1);
  const page = PageParams.find((p) => p.name === route.id);

  return (
    <ConfigContext.Provider
      value={{
        pages: PageParams,
        matchRoute: route,
        matchPage: page,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function usePageMatch() {
  const { matchPage } = useContext(ConfigContext);

  return useMemo(() => matchPage, [matchPage]);
}
