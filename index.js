document.addEventListener('DOMContentLoaded', function () {
    loadRoutines();
});

function addRoutine() {
    const routineInput = document.getElementById('routine');
    const deadlineInput = document.getElementById('deadline');

    const routine = routineInput.value.trim();
    const deadline = deadlineInput.value.trim();

    if (routine === '' || deadline === '') {
        alert('Please enter both routine and deadline.');
        return;
    }

    const routineList = document.getElementById('routine-list');
    const li = document.createElement('li');
    li.innerHTML = `<span>${routine}</span><span>${deadline}</span><button onclick="removeRoutine(this)">Delete</button>`;
    routineList.appendChild(li);

    saveRoutine(routine, deadline);

    routineInput.value = '';
    deadlineInput.value = '';
}

function removeRoutine(element) {
    const li = element.parentNode;
    const routine = li.querySelector('span').innerText.trim();
    const deadline = li.querySelector('span:last-child').innerText.trim();

    if (confirm(`Are you sure you want to delete '${routine}' with deadline '${deadline}'?`)) {
        li.remove();
        removeRoutineFromStorage(routine, deadline);
    }
}

function saveRoutine(routine, deadline) {
    const routines = getRoutinesFromStorage();
    routines.push({ routine, deadline });
    localStorage.setItem('routines', JSON.stringify(routines));
}

function removeRoutine(element) {
    const li = element.parentNode;
    const routine = li.querySelector('span').innerText.trim();
    const deadline = li.querySelector('span:last-child').innerText.trim();

    if (confirm(`Are you sure you want to delete '${routine}' with deadline '${deadline}'?`)) {
        li.remove();
        removeRoutineFromStorage(routine, deadline);
    }
}

function getRoutinesFromStorage() {
    const routinesJSON = localStorage.getItem('routines');
    return routinesJSON ? JSON.parse(routinesJSON) : [];
}

function loadRoutines() {
    const routineList = document.getElementById('routine-list');
    const routines = getRoutinesFromStorage();

    routines.forEach(routine => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${routine.routine}</span><span>${routine.deadline}</span><button onclick="removeRoutine(this)">Delete</button>`;
        routineList.appendChild(li);
    });
}
