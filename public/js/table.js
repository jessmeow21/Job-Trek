$(document).ready(function() {

    var companyInput = $("#company");
    var positionInput = $("#position");
    var activityInput = $("#activity");
    var statusInput = $("#status");
    var salaryInput = $("#salaryModal");

    $("#submitNewJob").on("click", function() {
        event.preventDefault();
        console.log("addjob");

        var salaryVal = salaryInput.val().trim();
        var salArr = salaryVal.split("-");
        var salMin = parseInt(salArr[0]);
        var salMax = parseInt(salArr[1]);
        var newJob = {
            company: companyInput
                .val()
                .trim(),
            position: positionInput
                .val()
                .trim(),
            activity: activityInput
                .val()
                .trim(),
            status: statusInput
                .val()
                .trim(),
            salaryMin: salMin,
            salaryMax: salMax,
            userId: 1
        }

        // console.log(newJob);
        createJob(newJob);
    });

    function createJob(newJob) {
        $.post("/api/job", newJob, function(res) {
            console.log("this is res", res)
        });
    }


});