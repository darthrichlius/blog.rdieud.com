import { PAGES, LAYOUT } from "../../typings/index";

const PagesParams = [
  {
    name: PAGES.HOME,
    head: {
      title: "Home",
    },
    layout: LAYOUT.DEFAULT,
  },
  {
    name: PAGES.SINGLE,
    head: {
      title: "Single",
    },
    layout: LAYOUT.DEFAULT,
  },
  {
    name: PAGES.ABOUT,
    head: {
      title: "About",
    },
    layout: LAYOUT.DEFAULT,
  },
];

export default PagesParams;
