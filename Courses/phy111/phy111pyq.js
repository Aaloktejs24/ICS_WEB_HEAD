document.addEventListener("DOMContentLoaded", () => {
    const category = "PYQ"; 

    fetch("phy111.json")
        .then(response => response.json())
        .then(data => {
            if (data[category]) {
                displayCategoryCourses(category, data[category]);
            } else {
                document.getElementById("categoryTitle").textContent = "Category Not Found";
            }
        })
        .catch(error => {
            console.error("Error loading resources:", error);
            document.getElementById("categoryTitle").textContent = "Error loading courses.";
        });
});

function displayCategoryCourses(category, courses) {

    const container = document.getElementById("courseList");
    container.innerHTML = "";

    if (courses.length === 0) {
        container.innerHTML = "<p>No courses available.</p>";
        return;
    }

    courses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        courseCard.innerHTML = `
            <h3>${course.Examname}</h3>
            <p><strong>Semester:</strong> ${course.Semester}</p>
            <p><strong>Year:</strong> ${course.Year}</p>
            <a href="${course.link}" target="_blank">Open</a>        `;

        container.appendChild(courseCard);
    });
}