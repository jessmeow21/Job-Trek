$(document).ready(function() {
  var companyInput = $("#company");
  var positionInput = $("#position");
  var statusInput = $("#status");
  var salaryInput = $("#salaryModal");

  // Every time page loads, we should grab the User's Jobs from the DB
  $.get("/api/job", function(data) {
    //console.log("Job", data);
    insertTableRow(data);
  });

  $("#submitNewJob").on("click", function() {
    console.log("addjob");

    var salaryVal = salaryInput.val().trim();
    var salArr = salaryVal.split("-");
    var salMin = parseInt(salArr[0]);
    var salMax = parseInt(salArr[1]);
    var newJob = {
      company: companyInput.val().trim(),
      position: positionInput.val().trim(),
      status: statusInput.val().trim(),
      salaryMin: salMin,
      salaryMax: salMax,
      UserId: 1
    };

    // console.log(newJob);
    createJob(newJob);
  });

  function createJob(newJob) {
    $.post("/api/job", newJob, function(res) {
      console.log("this is res", res);
    });
  }

  // Create Table Row...
  function insertTableRow (dbJob) {
    // 1. dbJob should be an array of objects, loop through array of objects and create each row...
    dbJob.forEach(element => {
      const table = $("#jobGrid");
      const tr = $("<tr>");
      const td = $("<td>");
      const checkBoxTd = $('<td><span class="custom-cdeckbox"><input type="checkbox" id="selectAll"><label for="selectAll"></label></span></td>');
      const companyTd = $(`<td>${element.company}</td>`);
      const positionTd = $(`<td>${element.position}</td>`);
      const deadlineTd = $(`<td>${new Date ().toDateString()}</td>`);
      const statusTd = $(`<td>${decodeJobStatus(element.status)}</td>`);
      const salaryTd = $(`<td>${element.salaryMin} - ${element.salaryMax}</td>`);
      const notesTd = $(`<td><a href="#editNotesModal" class="edit" data-toggle="modal" data-id="${element.id}">&#x1F4DD</a></td>`);
      const priorityTd = $(`<td><div class="fire" data-rating="3"><span class="fire">🔥</span><span class="fire">🔥</span><span class="fire">🔥</span></div></td>`);
      const editTd = $(`<td><a href="#editJobModal" class="edit" data-toggle="modal" data-id="${element.id}">✏️<a href="#deleteJobModal" class="delete" data-toggle="modal"data-id=${element.id}>🗑️</a></td>`)

      // console.log(element.id);
      console.log(element);
      // Make new table row and append it to the table...
      tr.attr('data-info',element.id);
      table.append(tr);
      tr.append(checkBoxTd);
      tr.append(companyTd);
      tr.append(positionTd);
      tr.append(deadlineTd);
      tr.append(statusTd);
      tr.append(salaryTd);
      tr.append(notesTd);
      tr.append(priorityTd);
      tr.append(editTd);
      
    });
  }

  function decodeJobStatus (status) {
    let strRetVal;

    switch (status) {
      case "1":
        strRetVal = "To Do";
        break;
      case "2":
        strRetVal = "Applied";
        break;
      case "3":
        strRetVal = "Waiting for a response";
        break;
      case "4":
        strRetVal = "Interview";
        break;
      case "5":
        strRetVal = "Got the job!";
        break;
    }

    return strRetVal
  };

  // Creates cells that make up a row...
  // function insertTableData (dbJob) {
  //   dbJob.forEach(element => {
      
  //   });
  // }
});
