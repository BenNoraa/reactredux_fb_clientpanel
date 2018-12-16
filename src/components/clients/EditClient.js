import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  render() {
    const { client } = this.props;

    if (client) {
      return <div> {client.firstName}</div>;
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

// connect to firebase
// storeAs: "client" b/c we are getting a single client
// we get id from the url (props.match.params.id) from the router
// destructuring inside connect to get ordered and then setting client to ordered.client
// to get access to props so we can access in render and then return info like shown above
export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
