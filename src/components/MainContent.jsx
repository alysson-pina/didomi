import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Input,
  InputLabel,
  makeStyles,
} from "@material-ui/core";

const MainContent = () => {
  const classes = useStyles();
  const [checkedCount, setCheckedCount] = useState(0);

  const handleChange = ({ target }) => (target.checked
    ? setCheckedCount(checkedCount + 1)
    : setCheckedCount(checkedCount - 1));

  return (
    <main className={classes.content}>
      <form className={classes.form}>
        <div>
          <Input placeholder="Name" className={classes.input} required />
          <Input placeholder="Email address" className={classes.input} type="email" required />
        </div>
        <h4>I agree to:</h4>
        <div className={classes.box}>
          <InputLabel htmlFor="newsletter" onChange={handleChange}>
            <Checkbox id="newsletter" />
            Receive newsletter
          </InputLabel>
          <InputLabel htmlFor="ads" onChange={handleChange}>
            <Checkbox id="ads" />
            Be shown targeted ads
          </InputLabel>
          <InputLabel htmlFor="statistics" onChange={handleChange}>
            <Checkbox id="statistics" />
            Contribute to anonymous visit statistics
          </InputLabel>
        </div>
        <div>
          <Button
            color="primary"
            variant="contained"
            disabled={checkedCount === 0}
          >
            Give consent
          </Button>
        </div>
      </form>
    </main>
  );
};

export default MainContent;

const useStyles = makeStyles((theme) => ({
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
  box: {
    padding: 5,
    marginBottom: 20,
    border: "1px solid grey",
  },
}));
