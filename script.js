document.addEventListener("DOMContentLoaded", () => {
    fetch("courses.json")
        .then(response => response.json())
        .then(data => {
            displayCourses(data);
            setupSearch(data);
        })
        .catch(error => console.error("Error loading resources:", error));
});

function displayCourses(courseData) {
    const container = document.getElementById("courseList");
    container.innerHTML = "";

    for (const category in courseData) {
        const categoryWrapper = document.createElement("div");
        categoryWrapper.classList.add("category-wrapper");
        categoryWrapper.setAttribute("data-category", category);

        const categoryHeader = document.createElement("h2");
        categoryHeader.textContent = category;
        categoryWrapper.appendChild(categoryHeader);

        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("course-category");

        courseData[category].forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
            courseCard.setAttribute("data-name", course.name.toLowerCase());
            courseCard.setAttribute("data-code", course.code.toLowerCase());

            courseCard.innerHTML = `
                <h3>${course.name}</h3>
                <p>Code: ${course.code}</p>
                <a href="${course.link}">Access Resources</a>
            `;

            categoryDiv.appendChild(courseCard);
        });

        categoryWrapper.appendChild(categoryDiv);
        container.appendChild(categoryWrapper);
    }
}

function setupSearch(courseData) {
    const searchBar = document.getElementById("searchBar");

    searchBar.addEventListener("input", () => {
        const searchText = searchBar.value.toLowerCase();
        const courseCards = document.querySelectorAll(".course-card");

        const categoryVisibility = {};

        courseCards.forEach(card => {
            const name = card.getAttribute("data-name");
            const code = card.getAttribute("data-code");
            const category = card.closest(".category-wrapper").getAttribute("data-category");

            if (name.includes(searchText) || code.includes(searchText) || category.toLowerCase().includes(searchText)) {
                card.style.display = "block";
                categoryVisibility[category] = true;
            } else {
                card.style.display = "none";
            }
        });

        document.querySelectorAll(".category-wrapper").forEach(wrapper => {
            const category = wrapper.getAttribute("data-category");
            wrapper.style.display = categoryVisibility[category] ? "block" : "none";
        });
    });
}