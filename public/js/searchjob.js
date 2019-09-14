/* eslint-disable camelcase */
$(document).ready(function() {
  // JQuery variables
  var keywordInput = $("#positionInput");
  var cityInput = $("#cityInput");
  var stateInput = $("#stateInput");
  var searchJob = $("#searchJob");

  // When the form is submitted, we validate there's an email and password entered
  searchJob.on("click", function(event) {
    event.preventDefault();
    $("tbody").remove("td.searched");
    var keywords = keywordInput
      .val()
      .trim()
      .toLowerCase();
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
    console.log(keyword);

    // Calls getJobs function which searches Authentic API using keyword and location
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
      var listings = response.listings.listing;

      var jobs = [];
      for (var i = 0; i < listings.length; i++) {
        var listing = listings[i];
        var job = {
          company: listing.company.name,
          position: listing.title,
          location: listing.company.location.name,
          type: listing.type.name,
          view: listing.url
        };
        jobs.push(job);
      }
      displayTable(jobs);
    });
  }

  function displayTable(jobsArr) {
    console.log(jobsArr);
    for (var i = 0; i < jobsArr.length; i++) {
      var company = jobsArr[i].company;
      var position = jobsArr[i].position;
      var location = jobsArr[i].location;
      var type = jobsArr[i].type;
      var view = jobsArr[i].view;

      var row = $("<tr>").appendTo("tbody");
      $("<td>")
        .appendTo(row)
        .text(company)
        .addClass("searched");
      $("<td>")
        .appendTo(row)
        .text(position)
        .addClass("searched");
      $("<td>")
        .appendTo(row)
        .text(location)
        .addClass("searched");
      $("<td>")
        .appendTo(row)
        .text(type)
        .addClass("searched");
      $("<td><a href=" + view + " target='_blank'>View Job</td>")
        .appendTo(row)
        .addClass("searched");
    }
  }

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
