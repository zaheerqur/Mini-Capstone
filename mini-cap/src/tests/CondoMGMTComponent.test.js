import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import CondoComponent from "../components/CondoMGMTComponent.jsx";

afterEach(()=>{
    cleanup();
});

test('Should not render profile picture of condo component', () => {
    const condoDetails = {
        picture: null,
        parkingNumber: 'P101',
        lockerNumber: 'L101',
        property: 'Property Name',
        squareFeet: '100',
        unitNumber: '101',
        unitPrice: '100000',
        unitSize: '3.5'
    };

    render(
      <CondoComponent
        {...condoDetails}
      />
    );
    expect(screen.getByText(condoDetails.unitNumber)).toBeInTheDocument();
    expect(screen.getByText('Unit Number: ' + condoDetails.unitNumber)).toBeInTheDocument();
    expect(screen.queryByAltText('Profile')).not.toBeInTheDocument();
});

test('Should render profile picture of condo component', () => {
    const condoDetails = {
        picture: 'https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg',
        parkingNumber: 'P101',
        lockerNumber: 'L101',
        property: 'Property Name',
        squareFeet: '100',
        unitNumber: '101',
        unitPrice: '100000',
        unitSize: '3.5'
    };

    render(
      <CondoComponent
        {...condoDetails}
      />
    );
    expect(screen.getByText(condoDetails.unitNumber)).toBeInTheDocument();
    expect(screen.getByText('Unit Number: ' + condoDetails.unitNumber)).toBeInTheDocument();
    const profilePicture = screen.getByAltText('Profile');
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture).toHaveAttribute('src', condoDetails.profilePicture);
});

test('Should render all condo management component details', () => {
  const condoDetails = {
    picture: 'https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg',
    parkingNumber: 'P101',
    lockerNumber: 'L101',
    property: 'Property Name',
    squareFeet: '100',
    unitNumber: '101',
    unitPrice: '100000',
    unitSize: '3.5'
  };

  render(
    <CondoComponent
      {...condoDetails}
    />
  );
  expect(screen.getByText(condoDetails.unitNumber)).toBeInTheDocument();
  expect(screen.getByText('Unit Number: ' + condoDetails.unitNumber)).toBeInTheDocument();
  expect(screen.getByText('Parking Spot: ' + condoDetails.parkingSpot)).toBeInTheDocument();
  expect(screen.getByText('Locker: ' + condoDetails.locker)).toBeInTheDocument();
  const profilePicture = screen.getByAltText('Profile');
  expect(profilePicture).toBeInTheDocument();
  expect(profilePicture).toHaveAttribute('src', condoDetails.profilePicture);
});

test('Should render only validator condo management component details', () => {
  const condoDetails = {
    picture: null,
    parkingNumber: null,
    lockerNumber: null,
    property: null,
    squareFeet: null,
    unitNumber: '101',
    unitPrice: null,
    unitSize: null
  };

  render(
    <CondoComponent
      {...condoDetails}
    />
  );
  expect(screen.queryByAltText('Profile')).not.toBeInTheDocument();
  expect(screen.queryByText('Parking Spot:')).not.toBeInTheDocument();
  expect(screen.queryByText('Locker: ')).not.toBeInTheDocument();
  expect(screen.getByText('Unit Number: ' + condoDetails.unitNumber)).toBeInTheDocument();
});

test('Should not render condo management component details without unit number', () => {
  const condoDetails = {
    picture: 'https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg',
    parkingNumber: 'P101',
    lockerNumber: 'L101',
    property: 'Property Name',
    squareFeet: '100',
    unitNumber: null,
    unitPrice: '100000',
    unitSize: '3.5'
  };

  render(
    <CondoComponent
      {...condoDetails}
    />
  );

  expect(screen.queryByText('Unit Number:')).not.toBeInTheDocument();
  expect(screen.queryByText('Parking Spot:')).not.toBeInTheDocument();
  expect(screen.queryByText('Locker:')).not.toBeInTheDocument();
  expect(screen.queryByAltText('Profile')).not.toBeInTheDocument();
});

test('Should render condo management component details without parking details', () => {
  const condoDetails = {
    picture: 'https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg',
    lockerNumber: 'L101',
    property: 'Property Name',
    squareFeet: '100',
    unitNumber: '101',
    unitPrice: '100000',
    unitSize: '3.5'
  };

  render(
    <CondoComponent
      {...condoDetails}
    />
  );
  expect(screen.getByText(condoDetails.unitNumber)).toBeInTheDocument();
  expect(screen.getByText('Unit Number: ' + condoDetails.unitNumber)).toBeInTheDocument();
  expect(screen.queryByText('Parking Spot:')).not.toBeInTheDocument();
  expect(screen.getByText('Locker: ' + condoDetails.locker)).toBeInTheDocument();
  const profilePicture = screen.getByAltText('Profile');
  expect(profilePicture).toBeInTheDocument();
  expect(profilePicture).toHaveAttribute('src', condoDetails.profilePicture);
});

test('Should render condo management component details without locker details', () => {
  const condoDetails = {
    picture: 'https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg',
    parkingNumber: 'P101',
    lockerNumber: null,
    property: 'Property Name',
    squareFeet: '100',
    unitNumber: '101',
    unitPrice: '100000',
    unitSize: '3.5'
  };

  render(
    <CondoComponent
      {...condoDetails}
    />
  );
  expect(screen.getByText(condoDetails.unitNumber)).toBeInTheDocument();
  expect(screen.getByText('Unit Number: ' + condoDetails.unitNumber)).toBeInTheDocument();
  expect(screen.getByText('Parking Spot: ' + condoDetails.parkingSpot)).toBeInTheDocument();
  expect(screen.queryByText('Locker: ')).not.toBeInTheDocument();
  const profilePicture = screen.getByAltText('Profile');
  expect(profilePicture).toBeInTheDocument();
  expect(profilePicture).toHaveAttribute('src', condoDetails.profilePicture);
});

test('Should render condo management component details without parking and locker details', () => {
  const condoDetails = {
    picture: 'https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg',
    parkingNumber: null,
    lockerNumber: null,
    property: 'Property Name',
    squareFeet: '100',
    unitNumber: '101',
    unitPrice: '100000',
    unitSize: '3.5'
  };

  render(
    <CondoComponent
      {...condoDetails}
    />
  );
  expect(screen.getByText(condoDetails.unitNumber)).toBeInTheDocument();
  expect(screen.getByText('Unit Number: ' + condoDetails.unitNumber)).toBeInTheDocument();
  expect(screen.queryByText('Parking Spot: ')).not.toBeInTheDocument();
  expect(screen.queryByText('Locker: ')).not.toBeInTheDocument();
  const profilePicture = screen.getByAltText('Profile');
  expect(profilePicture).toBeInTheDocument();
  expect(profilePicture).toHaveAttribute('src', condoDetails.profilePicture);
});

test('Should display "send key" popup', () => {
  const condoDetails = {
    picture: 'https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg',
    parkingNumber: 'P101',
    lockerNumber: 'L101',
    property: 'Property Name',
    squareFeet: '100',
    unitNumber: '101',
    unitPrice: '100000',
    unitSize: '3.5'
  };

  render(
    <CondoComponent
      {...condoDetails}
    />
  );

  expect(screen.getByText('Send Key')).toBeInTheDocument();
  expect(screen.queryByText('Send Your Condo Key')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Send Key'));
  expect(screen.getByText('Send Your Condo Key')).toBeInTheDocument();
});

test('Should toggle popup when "Send Key" button is clicked', () => {
  const condoDetails = {
    picture: 'https://example.com/profile.jpg',
    unitNumber: '101',
    parkingNumber: 'P101',
    lockerNumber: 'L101',
    property: 'Property Name',
    squareFeet: '100',
    unitPrice: '100000',
    unitSize: '3.5',
    condoId: '123'
  };

  render(
    <CondoComponent
      {...condoDetails}
    />
  );

  expect(screen.queryByText('Send Your Condo Key')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Send Key'));
  expect(screen.getByText('Send Your Condo Key')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Send Key'));
  expect(screen.queryByText('Send Your Condo Key')).not.toBeInTheDocument();
});

test('Should call handlePopupToggle when "Send Key" button is clicked', () => {
  const condoDetails = {
    picture: 'https://example.com/profile.jpg',
    unitNumber: '101',
    parkingNumber: 'P101',
    lockerNumber: 'L101',
    property: 'Property Name',
    squareFeet: '100',
    unitPrice: '100000',
    unitSize: '3.5',
    condoId: '123'
  };

  const handlePopupToggle = jest.fn();

  render(
    <CondoMgmtComponent 
      {...condoDetails} 
      handlePopupToggle={handlePopupToggle} 
    />
  );

  fireEvent.click(screen.getByText('Send Key'));
  expect(handlePopupToggle).toHaveBeenCalled();
});


