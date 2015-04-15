/*eslint-env browser*/
/*eslint-disable no-console*/
/*globals gapi*/ // Google Identity Toolkit

function onSignIn (googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  console.log(googleUser);
}

(function () {
  "use strict";

  var signOut = document.getElementById("signOut");

  function onSignOutClick() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
  }

  signOut.addEventListener("click", onSignOutClick, false);
}());
