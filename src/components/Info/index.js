// eslint-disable-next-line no-unused-vars
import React from "react";
import Paper from "@material-ui/core/Paper";
import "./index.css";
import axios from "axios";

class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "",
      data: [],
    };
  }

  componentDidMount() {
    if (this.state.display.toLowerCase() === "people in space") {
      let list = Object.entries(this.state.data);
      let people = [];

      Object.entries(list).forEach((person) => {
        people.push(person[1][1].name);
      });
      this.setState({
        data: people,
        display: this.props.display,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.display !== this.props.display) {
      switch (this.props.display.toLowerCase()) {
        case "current position":
          this.getCurrentPosition().then(() =>
            console.log(
              "Retrieved the current position of the International Space Station!"
            )
          );
          break;
        case "pass":
          break;
        case "people in space":
          this.getPeopleInSpace().then(() => {
            console.log(
              "Retrieved the astronauts currently inhabiting the International Space Station!"
            );
          });
          break;
        default:
          break;
      }
    }
  }

  /* Make api call to get the current location of the International Space Station (ISS) */
  getCurrentPosition = async () => {
    await axios
      .get("http://api.open-notify.org/iss-now.json", {})
      .then((res) => {
        const data = res.data.iss_position;
        this.setState({
          display: "Current Position",
          data: [data.latitude, data.longitude],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* Make api call to retrieve estimated time the ISS will pass our current position */
  // TODO: Modify CORS
  getPassTime = (LAT, LON) => {
    navigator.geolocation.getCurrentPosition((position) => {
      let LAT = position.coords.latitude;
      let LON = position.coords.longitude;
      axios
        .get(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  // Make api call to retrieve the names of the people who are currently in the ISS
  getPeopleInSpace = async () => {
    await axios
      .get("http://api.open-notify.org/astros.json", {})
      .then((res) => {
        const data = Object.entries(res.data.people);
        let people = [];

        // Extract names from object and store in array
        Object.entries(data).forEach((person) => {
          people.push(person[1][1].name);
        });

        this.setState({ data: people, display: this.props.display });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <Paper elevation={10} id="info-container">
        <h3>{this.state.display}</h3>
        {this.state.data.map((val, index) => {
          return <p key={val}>{val}</p>;
        })}
      </Paper>
    );
  }
}

export default Info;
