/*globals gapi*/ // Google Identity Toolkit

"use strict";

// 3rd-party modules

import {Button} from "react-pure";
import React from "react";

import loadjs from "loadjs-ex-requirejs";

// this module

export default class GoogleHelper extends React.Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
      profile: null,
      response: null
    };
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.handleCurrentUser = this.handleCurrentUser.bind(this);
  }

  componentWillMount() {
    loadjs("https://apis.google.com/js/platform.js", (err) => {
      if (!err) {
        gapi.load("auth2", () => {
          gapi.auth2.init();
          this.setState({ loaded: true });
          this.handleCurrentUser();
        });
      }
    });
  }

  componentDidMount() {
  }

  handleCurrentUser() {
    const auth2 = gapi.auth2.getAuthInstance();
    const user = auth2.currentUser.get();
    if (user.isSignedIn()) {
      this.setState({
        profile: user.getBasicProfile(),
        response: user.getAuthResponse()
      });
    } else {
      this.setState({
        profile: null,
        response: null
      });
    }
  }

  handleSignInClick() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((user) => {
      this.handleCurrentUser();
    }, function (err) {
      console.error("signIn", err);
    });
  }

  handleSignOutClick() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.handleCurrentUser();
    }, function (err) {
      console.error("signOut", err);
    });
  }

  render() {
    const loaded = this.state.loaded;
    const profile = this.state.profile;
    return (
      <div>
        <h2>Google</h2>
        <Button onClick={this.handleSignInClick} disabled={!loaded}>Sign In</Button>
        <Button onClick={this.handleSignOutClick} disabled={!loaded}>Sign Out</Button>
        { profile ? (
          <dl>
            <dt>Name</dt>
            <dd>{profile.getName()}</dd>
            <dt>ID</dt>
            <dd>{profile.getId()}</dd>
            <dt>Email</dt>
            <dd>{profile.getEmail()}</dd>
            <dt>Image</dt>
            <dd>
              <img src={profile.getImageUrl()} alt="profile image" />
            </dd>
          </dl>
        ) : null }
      </div>
    );
  }

}
