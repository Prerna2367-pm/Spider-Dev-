function calculateGrade() {
    let marks = Number(document.getElementById("marks").value);
    let grade, status;

    // Check valid input
    if (marks < 0 || marks > 100 || isNaN(marks)) {
        document.getElementById("result").innerHTML =
            "Please enter valid marks between 0 and 100.";
        return;
    }

    // Calculate Grade
    if (marks >= 90) {
        grade = "A";
    } else if (marks >= 75) {
        grade = "B";
    } else if (marks >= 60) {
        grade = "C";
    } else {
        grade = "D";
    }

    // Pass or Fail
    if (marks >= 60) {
        status = "Pass";
    } else {
        status = "Fail";
    }

    // Display Result
    document.getElementById("result").innerHTML =
        "Grade: " + grade + "<br>Status: " + status;
}