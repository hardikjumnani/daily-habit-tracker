const today = new Date();
const todayDate = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const daysToSubtract = 4;
const daysToAdd = 1;

const pastDate = new Date(today);
pastDate.setDate(today.getDate() - daysToSubtract);

const futureDate = new Date(today);
futureDate.setDate(today.getDate() + daysToAdd);

const habits = [
    "Drink Water",
    "Exercise",
    "Read",
    "Meditate",
    "Sleep 8 Hours",
];

function newHabitRow() {
    const addNewHabitRow = document.createElement("tr");
    const addNewHabitCell = document.createElement("td");

    
    addNewHabitCell.innerText = "+";
    addNewHabitCell.colSpan = daysToAdd + daysToSubtract + 1 + 1; // first 1 for today, second for row headings of habit.
    
    addNewHabitCell.addEventListener("click", (event) => {
        event.stopPropagation();
        if (addNewHabitCell.children.length == 0) {
            console.log("call");
            const newHabitDetails = document.createElement("div");

            const newHabitDetailsName = document.createElement("input");
            newHabitDetailsName.type = "text";

            const newHabitDetailsSave = document.createElement("input");
            newHabitDetailsSave.type = "submit";
            newHabitDetailsSave.value = "Submit";

            newHabitDetailsSave.addEventListener("click", (event) => {
                event.stopPropagation();
                habits.push(newHabitDetailsName.value);
                fillRowHeadings(habits);

                const addNewHabitRow = newHabitRow();
                calendar.appendChild(addNewHabitRow);

                addNewHabitCell.removeChild(newHabitDetails);
            });

            newHabitDetails.appendChild(newHabitDetailsName);
            newHabitDetails.appendChild(newHabitDetailsSave);

            setTimeout(() => {
                newHabitDetailsName.focus();
            }, 100); // render before focus

            addNewHabitCell.appendChild(newHabitDetails);
        }
        
    });
    
    addNewHabitRow.appendChild(addNewHabitCell);

    return addNewHabitRow;

}

function fillRowHeadings() {
    // Remove all children except headerRow
    while (calendar.children.length > 1) {
        calendar.removeChild(calendar.lastChild);
    }

    habits.forEach((habit, habitIndex) => {
        const habitRow = document.createElement("tr");

        const habitNameCell = document.createElement("td");
        habitNameCell.className = "habit-name";
        habitNameCell.innerText = habit;
        habitRow.appendChild(habitNameCell);

        for (let day = pastDate.getDate(); day <= futureDate.getDate(); day++) {
            const dayCell = document.createElement("td");

            const dayElement = document.createElement("div");
            dayElement.className = "day";
            const isCompleted = JSON.parse(localStorage.getItem(`habit-${habitIndex}-day-${day}`)) || false;
            if (isCompleted) {
                dayElement.classList.add("completed");
            }

            dayElement.addEventListener("click", () => {
                dayElement.classList.toggle("completed");
                localStorage.setItem(`habit-${habitIndex}-day-${day}`, dayElement.classList.contains("completed"));
            });

            dayCell.appendChild(dayElement);
            habitRow.appendChild(dayCell);
        }

        calendar.appendChild(habitRow);
    });


}
document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");

    // Create header row with dates
    const headerRow = document.createElement("tr");

    const emptyCell = document.createElement("th");
    headerRow.appendChild(emptyCell);

    for (let day = pastDate.getDate(); day <= futureDate.getDate(); day++) {
        const header = document.createElement("th");
        header.innerText = day;
        headerRow.appendChild(header);
    }
    calendar.appendChild(headerRow);

    // Create rows for each habit
    fillRowHeadings();

    // add new habit row
    const addNewHabitRow = newHabitRow();
    calendar.appendChild(addNewHabitRow);

});