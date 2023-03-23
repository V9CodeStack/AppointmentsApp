import { Component } from "react";
import { v4 } from "uuid";
import { format } from "date-fns";
import AppointmentItem from "../AppointmentItem";
import "./index.css";

const dummyAppontment = [
  {
    id: v4(),
    title: "Meet Doctor",
    date: format(new Date(), "dd MMMM yyyy, EEEE"),
    isStarred: false,
  },
];

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: "",
    dateInput: "",
    isFilterActive: false,
  };

  onChangeTitleInput = (event) => {
    this.setState({ titleInput: event.target.value });
  };

  onChangeDateInput = (event) => {
    this.setState({ dateInput: event.target.value });
  };

  onAddAppointment = (event) => {
    event.preventDefault();
    const { titleInput, dateInput } = this.state;
    const formattedDate = dateInput
      ? format(new Date(dateInput), "dd MMMM yyyy, EEEE")
      : "";
    const newAppontment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    };
    this.setState((prevState) => ({
      appointmentsList: [...prevState.appointmentsList, newAppontment],
      titleInput: "",
      dateInput: "",
    }));
  };

  toggleIsStarred = (id) => {
    this.setState((prevState) => ({
      appointmentsList: prevState.appointmentsList.map((eachAppontment) => {
        if (eachAppontment.id === id) {
          return { ...eachAppontment, isStarred: !eachAppontment.isStarred };
        }
        return eachAppontment;
      }),
    }));
  };

  onFilter = () => {
    const { isFilterActive } = this.state;
    this.setState({ isFilterActive: !isFilterActive });
  };

  getFilteredAppointmentsList = () => {
    const { appointmentsList, isFilterActive } = this.state;

    if (isFilterActive) {
      return appointmentsList.filter(
        (eachTransaction) => eachTransaction.isStarred === true
      );
    }
    return appointmentsList;
  };

  render() {
    const { titleInput, dateInput, isFilterActive } = this.state;
    const filterClassName = isFilterActive ? "filter-filtered" : "filter-empty";
    const filteredAppointmentsList = this.getFilteredAppointmentsList();

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  className="input"
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointmemts-heading">Appointmemts</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appintments-list">
              {filteredAppointmentsList.map((eachAppontment) => (
                <AppointmentItem
                  key={eachAppontment.id}
                  appointmentDetails={eachAppontment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Appointments;
