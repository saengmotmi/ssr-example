import React from "react";
import Home from "./Home";
import About from "./About";

export default function App({ page }) {
  const [pageState, setPageState] = React.useState(page);

  React.useEffect(() => {
    window.onpopstate = (e) => {
      setPageState(e.state);
    };
  }, []);

  const onChangePage = (e) => {
    const newPage = e.target.dataset.page;

    window.history.pushState(newPage, "", `/${newPage}`); // 특정 페이지로 이동

    setPageState(newPage);
  };

  return (
    <div>
      <button data-page="home" onClick={onChangePage}>
        Home
      </button>
      <button data-page="about" onClick={onChangePage}>
        About
      </button>
      {route[pageState]}
    </div>
  );
}

const route = {
  home: <Home />,
  about: <About />,
};
