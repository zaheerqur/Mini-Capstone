import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../styling/FacilityComponent.css";

/**
 * ReservationComponent displays information about a reservation.
 * @param {object} props - The properties passed to the component.
 * @param {string} props.facilityType - The type of facility for the reservation.
 * @param {string} props.startTime - The start time of the reservation.
 * @param {string} props.endTime - The end time of the reservation.
 * @param {string} props.date - The date of the reservation.
 * @param {number} props.month - The month index (0-11) of the reservation.
 * @returns {JSX.Element} A React component displaying reservation information.
 */

const ReservationComponent = ({
  facilityType,
  startTime,
  endTime,
  date,
  month,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name based on the month number
  const reservationMonth = monthNames[month];

  return (
    <div className="component-container">
      <div className="facility-title">Upcoming Reservation: {facilityType}</div>
      <div className="facility-description"></div>
      <div>
        Date: {reservationMonth} {date}{" "}
      </div>
      <div>
        Time: {startTime} - {endTime}
      </div>
    </div>
  );
};

// PropTypes for type checking the props passed to ReservationComponent
ReservationComponent.propTypes = {
    facilityType: PropTypes.string.isRequired, // Facility type is a required string
    date: PropTypes.string.isRequired, // Date is a required string
    month: PropTypes.number.isRequired, // Month is a required number
    startTime: PropTypes.string.isRequired, // Start time is a required string
    endTime: PropTypes.string.isRequired // End time is a required string
};

export default ReservationComponent;
