import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { ClipLoader } from "react-spinners";

import { addUsersConsent } from "../actions";

const emptyRow = (
  <tfoot>
    <td> </td>
    <td> </td>
    <td> </td>
  </tfoot>
);

const Consents = ({ users, addUsers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      // eslint-disable-next-line no-undef
      fetch("http://mock.url/consents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(response => {
          addUsers(response.data); // update our REDUX store
          setError("");
        })
        .catch(err => {
          setError(`Error: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Consent given for:</th>
        </tr>

        {users
          .filter(el => el != null)
          .map(user => (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.consents.join(",")}</td>
            </tr>
          ))}
        {users == null || users.length === 0 ? emptyRow : ""}
        {error.length > 0 ? <div className={classes.error}>{error}</div> : null}
      </table>
      <div className={classes.spinner}>
        <ClipLoader
          css="margin: 0 auto"
          size={40}
          color="#123abc"
          loading={isLoading}
        />
      </div>
    </div>
  );
};

Consents.propTypes = {
  users: PropTypes.arrayOf({
    name: PropTypes.string,
    email: PropTypes.string,
    consents: PropTypes.array,
  }).isRequired,
  addUsers: PropTypes.func.isRequired,
};

Consents.defaultTypes = {
  users: [],
};

const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch => ({
  addUsers: users => dispatch(addUsersConsent(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Consents);

const useStyles = makeStyles(() => ({
  root: {
    margin: 20,
    "& table, td, th": {
      border: "1px solid black",
      padding: "5px",
    },
    "& td": {
      minHeight: "15px",
    },
  },
  spinner: {
    display: "flex",
    marginTop: 10,
  },
}));
