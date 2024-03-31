import { NavLink } from "react-router-dom";

export default function Header({
  children,
  theme = "secondary",
  href = "",
  type= "button",
  ...props
}) {
  return (
    <>
      {!href && (
        <button className={`btn btn-${theme}`} type={type} {...props}>
          {children}
        </button>
      )}
      {href && (
        <NavLink to={href} className={`btn btn-${theme}`}>
          {children}
        </NavLink>
      )}
    </>
  );
}
