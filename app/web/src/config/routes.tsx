import { Root } from "../layout/index.ts";
import { HomePage, SinglePage, AboutPage } from "../pages/index.ts";
import { PAGES } from "../typings/index";

export const Routes = [
  {
    id: "APP_ROOT",
    path: "/",
    element: <Root />,
    children: [
      {
        id: PAGES.HOME,
        path: "",
        element: <HomePage />,
      },
      {
        id: PAGES.SINGLE,
        path: "/post/:id",
        element: <SinglePage />,
      },
      {
        id: PAGES.ABOUT,
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
];
