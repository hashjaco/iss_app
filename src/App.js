import React, { useState } from "react";
import { Header, Scene, Footer, Button, Info } from "./components";
import "./App.css";
import axios from "axios";

const App = () => {
  // Display is the label for the container of dynamic data. When a button is pressed, it will send a unique label into the component to fetch specific data. The Info component will know when the label updates
  let [display, setDisplay] = useState("");

  const getCurrentPosition = async () => {
    setDisplay("Current Position");
  };

  const getPassTime = (LAT, LON) => {
    setDisplay("Pass");
  };

  const getPeopleInSpace = () => {
    setDisplay("People in Space");
  };

  return (
    <div className="App">
      <Header />
      <Scene style={{ zIndex: 0 }}/>
      <Info display={display} style={{ zIndex: 2}}/>
      <Footer>
        <Button text="CURRENT" onPress={getCurrentPosition} />
        <Button text="PASS" onPress={getPassTime} />
        <Button text="PEOPLE" onPress={getPeopleInSpace} />
      </Footer>
    </div>
  );
};

export default App;
