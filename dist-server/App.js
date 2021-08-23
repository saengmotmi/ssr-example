"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireDefault(require("react"));

var _Home = _interopRequireDefault(require("./Home"));

var _About = _interopRequireDefault(require("./About"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App({
  page
}) {
  const [pageState, setPageState] = _react.default.useState(page);

  _react.default.useEffect(() => {
    window.onpopstate = e => {
      setPageState(e.state);
    };
  }, []);

  const onChangePage = e => {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, "", `/${newPage}`); // 특정 페이지로 이동

    setPageState(newPage);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    "data-page": "home",
    onClick: onChangePage
  }, "Home"), /*#__PURE__*/_react.default.createElement("button", {
    "data-page": "about",
    onClick: onChangePage
  }, "About"), route[pageState]);
}

const route = {
  home: /*#__PURE__*/_react.default.createElement(_Home.default, null),
  about: /*#__PURE__*/_react.default.createElement(_About.default, null)
};