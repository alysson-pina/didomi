/* eslint-disable react/prop-types */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Drawer,
  makeStyles,
  styled,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const drawerWidth = 200;

const LeftNav = ({ location }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        {[
          { text: "Give consent", url: "/give-consent", key: 1 },
          { text: "Collected consents", url: "/consents", key: 2 },
        ].map(obj => (
          <MyListItem
            button
            key={obj.text}
            className={
              location.pathname === obj.url ? classes.selectedItem : ""
            }
          >
            <MyLink to={obj.url}>
              <ListItemText
                primary={obj.text}
                className={
                  location.pathname === obj.url ? classes.selectedLinkText : ""
                }
              />
            </MyLink>
          </MyListItem>
        ))}
      </List>
    </Drawer>
  );
};

LeftNav.propTypes = {
  location: {
    pathname: PropTypes.string,
  }.isRequired,
}.isRequired;

LeftNav.defaultProps = {
  location: {
    pathname: "",
  },
};

export default withRouter(LeftNav);

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  selectedItem: {
    backgroundColor: "lightskyblue",
  },
  nav: {
    justifyContent: "center",
  },
  selectedLinkText: {
    "& span": {
      color: "black",
      fontWeight: "bold",
    },
  },
}));

const MyListItem = styled(ListItem)({
  justifyContent: "center",
});

const MyLink = styled(Link)({
  textDecoration: "none",
});
