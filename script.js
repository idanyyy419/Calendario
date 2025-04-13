
let currentDate = new Date();
let trades = {}; // Oggetto per memorizzare le note del giorno

function updateCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    document.getElementById("month-year").textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                cell.textContent = "";
            } else if (date > daysInMonth) {
                break;
            } else {
                const cellDate = `${year}-${month + 1}-${date}`;
                cell.textContent = date;

                if (trades[cellDate] === "positive") {
                    cell.classList.add("positive");
                } else if (trades[cellDate] === "negative") {
                    cell.classList.add("negative");
                }

                cell.addEventListener("click", () => {
                    const result = prompt("Inserisci nota per il giorno (positive/negative):");
                    if (result === "positive" || result === "negative") {
                        trades[cellDate] = result;
                        updateCalendar();
                    }
                });

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();
