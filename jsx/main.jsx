"use strict";

// 3rd-party modules

import React from "react";

// our modules

import FacebookHelper from "./facebook-helper.jsx";
import GoogleHelper from "./google-helper.jsx";

// this module

React.render(
  <FacebookHelper></FacebookHelper>,
  document.getElementById("facebook")
);

React.render(
  <GoogleHelper></GoogleHelper>,
  document.getElementById("google")
);
