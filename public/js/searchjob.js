/* eslint-disable camelcase */
$(document).ready(function() {
  // JQuery variables
  var keywordInput = $("#positionInput");
  console.log(keywordInput);
  var cityInput = $("#cityInput");
  var stateInput = $("#stateInput");
  var searchJob = $("#searchJob");

  // When the form is submitted, we validate there's an email and password entered
  searchJob.on("click", function(event) {
    event.preventDefault();

    var keywords = keywordInput.val().trim();
    var city = cityInput
      .val()
      .trim()
      .toLowerCase()
      .replace(/\s/g, "");
    var state = stateInput
      .val()
      .trim()
      .toLowerCase();
    var keyword = keywords.split(/[ ,]+/).join(",");
    var location = city + state;

    // console.log(keyword);
    // console.log(city);
    // console.log(state);
    // console.log(location);

    // If we have an email and password we run the loginUser function and clear the form
    getJobs(keyword, location);
    keywordInput.val("");
    cityInput.val("");
    stateInput.val("");
  });

  // Makes AJAX req to get jobs by keyword and location
  function getJobs(keyword, location) {
    var key = "df83e592b6d39a230c94c942cfb2b178";
    var queryURL =
      "https://authenticjobs.com/api/?api_key=" +
      key +
      "&format=json&method=aj.jobs.search&keywords=" +
      keyword +
      "&location=" +
      location;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  }

  // var keywordInput = "javascript,developer";
  // var locationInput = "philadelphiapa";

  // getJobs(keywordInput, locationInput);

  /*
   * ----------------------------------------------------------------
   */

  // CORS Anywhere function
  (function() {
    var cors_api_host = "cors-anywhere.herokuapp.com";
    var cors_api_url = "https://" + cors_api_host + "/";
    var slice = [].slice;
    var origin = window.location.protocol + "//" + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      var args = slice.call(arguments);
      var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
      if (
        targetOrigin &&
        targetOrigin[0].toLowerCase() !== origin &&
        targetOrigin[1] !== cors_api_host
      ) {
        args[1] = cors_api_url + args[1];
      }
      return open.apply(this, args);
    };
  })();
});
