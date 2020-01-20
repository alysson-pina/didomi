import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { ClipLoader } from "react-spinners";

import LeftNav from "../components/LeftNav";
import Table from "../components/Table";
import { addUsersConsent } from "../actions";
import { userPropTypes } from "../types/types";

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
      <LeftNav />
      <div className={classes.content}>
        <Table users={users} />
        {error.length > 0 ? (
          <div className={classes.error}>{error}</div>
        ) : null}
        <div className={classes.spinner}>
          <ClipLoader
            css="margin: 0 auto"
            size={40}
            color="#123abc"
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

Consents.propTypes = {
  users: PropTypes.arrayOf(userPropTypes).isRequired,
  addUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch => ({
  addUsers: users => dispatch(addUsersConsent(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Consents);

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: 20,
    "& table, td, th": {
      border: "1px solid black",
      padding: "5px",
    },
    "& td": {
      minHeight: "15px",
    },
  },
  content: {
    flexGrow: 1,
  },
  spinner: {
    display: "flex",
    marginTop: 10,
  },
}));
