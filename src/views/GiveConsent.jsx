import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Button,
  Checkbox,
  Input,
  InputLabel,
  makeStyles,
} from "@material-ui/core";

import LeftNav from "../components/LeftNav";
import { addUserConsent } from "../actions";

const GiveConsent = ({ history, addUser }) => {
  const classes = useStyles();
  const [checkedCount, setCheckedCount] = useState(0);
  const [consents, setConsents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    if (target.checked) {
      setCheckedCount(checkedCount + 1);
      setConsents([...consents, target.name]);
    } else {
      setCheckedCount(checkedCount - 1);
      setConsents(consents.filter(el => el.id !== target.name));
    }
  };

  const handleNameInput = ({ target }) => {
    setError("");
    setName(target.value);
  };
  const handleEmailInput = ({ target }) => {
    setError("");
    setEmail(target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const errors = validate(name, email);

    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }
    setError("");

    // post new user to server, add info to the store and redirect
    const data = { name, email, consents };

    // eslint-disable-next-line no-undef
    fetch("http://mock.url/consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        addUser(data); // update our REDUX store
        history.push("/consents"); // REDIRECT to /consents
      })
      .catch(err => {
        setError(`Error: ${err}`);
      });
  };

  return (
    <div className={classes.root}>
      <LeftNav />
      <main className={classes.content}>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          action="/consent"
          method="post"
        >
          <div>
            <Input
              type="text"
              placeholder="Name"
              className={classes.input}
              onChange={handleNameInput}
              value={name}
              pattern="[a-zA-Z ]+"
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              className={classes.input}
              onChange={handleEmailInput}
              value={email}
              pattern="[a-z0-9]+@[a-z0-9.-]+\.[a-z]{2,4}"
              required
            />
          </div>
          <h4>I agree to:</h4>
          <fieldset>
            <InputLabel htmlFor="newsletter" onChange={handleChange}>
              <Checkbox name="newsletter" />
              Receive newsletter
            </InputLabel>
            <InputLabel htmlFor="ads" onChange={handleChange}>
              <Checkbox name="ads" />
              Be shown targeted ads
            </InputLabel>
            <InputLabel htmlFor="statistics" onChange={handleChange}>
              <Checkbox name="statistics" />
              Contribute to anonymous visit statistics
            </InputLabel>
          </fieldset>
          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              variant="contained"
              disabled={checkedCount === 0}
              type="submit"
            >
              Give consent
            </Button>
          </div>
          {error.length > 0 ? (
            <div className={classes.error}>{error}</div>
          ) : null}
        </form>
      </main>
    </div>
  );
};

GiveConsent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  addUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ addUser: (user) => dispatch(addUserConsent(user)) });

export default withRouter(connect(null, mapDispatchToProps)(GiveConsent));

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  input: {
    margin: 5,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
  },
}));

function validate(name, email) {
  const namePattern = /^[a-zA-Z]+[ ]{0,1}[a-zA-Z]*$/;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const errors = [];

  if (!namePattern.test(name)) {
    errors.push("Name must be just alphabet letters and optionally a surname.");
  }

  if (!emailPattern.test(email)) {
    errors.push("Invalid email domain name.");
  }

  return errors;
}
