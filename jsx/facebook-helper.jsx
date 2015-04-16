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
    loadjs("https://connect.facebook.net/en_US/sdk.js", (err) => {
      if (!err) {
        this.setState({ loaded: true });
        this.handleCurrentUser();
      }
    });
  }

  componentDidMount() {
  }

  handleCurrentUser() {
    if (window.fbAsyncInit) {
      this.setState({
        profile: null,
        response: null
      });
      return;
    }
    FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        this.setState({
          profile: {
            id: response.authResponse.user_id
          },
          response: response.authResponse
        });
        FB.api('/me', {}, (response) => {
          this.setState({
            profile: {
              id: response.id,
              name: response.name
            },
            response: response.authResponse
          });
        });
      } else {
        this.setState({
          profile: null,
          response: null
        });
      }
    });
  }

  handleSignInClick() {
    FB.login(() => {
      this.handleCurrentUser();
    });
  }

  handleSignOutClick() {
    FB.logout(() => {
      this.handleCurrentUser();
    });
  }

  render() {
    const loaded = this.state.loaded;
    const profile = this.state.profile;
    return (
      <div>
        <h2>Facebook</h2>
        <Button onClick={this.handleSignInClick} disabled={!loaded}>Sign In</Button>
        <Button onClick={this.handleSignOutClick} disabled={!loaded}>Sign Out</Button>
        { profile ? (
          <dl>
            <dt>Name</dt>
            <dd>{profile.name}</dd>
            <dt>ID</dt>
            <dd>{profile.id}</dd>
          </dl>
        ) : null }
      </div>
    );
  }

}
