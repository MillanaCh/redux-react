import React from "react";
import "./App.css";
import Main from "./component/Main";
import Header from "./component/Header";
class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}
export default App;
