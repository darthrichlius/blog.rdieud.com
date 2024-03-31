import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useDocumentTitle } from "usehooks-ts";
import { DefaultLayout } from ".";
import ConfigContextProvider, { usePageMatch } from "../context/ConfigContext";
import { LAYOUT } from "../typings";
import ApiParams from "../config/_params/api";

/*
  @devnotes
    For Academics purposes
*/
// const queryClient = new QueryClient({ ...ApiParams.providers["react-query"] });
const queryClient = new QueryClient();

/**
 * - Define the proper layout based on page configuration
 * - Declare common providers
 */
export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigContextProvider>
        <LayoutProvider>
          <Outlet />
          {/* @todos Deativate for PROD env */}
          <ReactQueryDevtools initialIsOpen={false} />
        </LayoutProvider>
      </ConfigContextProvider>
    </QueryClientProvider>
  );
}

function LayoutProvider({ children }) {
  const matchPage = usePageMatch();
  useDocumentTitle(matchPage.head.title);

  return (
    <>
      {matchPage.layout === LAYOUT.DEFAULT && (
        <DefaultLayout>{children}</DefaultLayout>
      )}
    </>
  );
}
