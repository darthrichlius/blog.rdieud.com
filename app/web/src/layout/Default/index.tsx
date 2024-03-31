import { Header } from "../../components";

export default function DefaultLayout({ children }) {
  return (
    <div className="">
      <Header />
      <div className="container">{children}</div>
      {/* Footer */}
    </div>
  );
}
