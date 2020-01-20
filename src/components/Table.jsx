/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core";

import { userPropTypes } from "../types/types";

const emptyRow = (
  <tr>
    <td />
    <td />
    <td />
  </tr>
);

const Table = ({ users }) => {
  const classes = useStyles();
  const tableBody = users
    .filter(el => el != null)
    .map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.consents.join(",")}</td>
      </tr>
    ));

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Consent given for:</th>
        </tr>
      </thead>
      <tbody>
        {users == null || users.length === 0 ? emptyRow : tableBody}
      </tbody>
    </table>
  );
};

Table.propTypes = userPropTypes;

export default Table;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: 20,
  },
  table: {
    border: "1px solid black",
    borderSpacing: 0,
    padding: "5px",
    "& th, td": {
      margin: "0",
      padding: "0.5rem",
      borderBottom: "1px solid black",
      borderRight: "1px solid black",
    },
    "& td": {
      minHeight: "15px",
    },
  },
}));
