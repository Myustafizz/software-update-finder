// --- Toggle the filter panel
const filterToggle = document.getElementById('filterToggle');
const filterPanel  = document.getElementById('filterPanel');

filterToggle.addEventListener('click', () => {
    const isOpen = filterPanel.classList.toggle('open');
    filterPanel.setAttribute('aria-hidden', String(!isOpen));
    filterToggle.setAttribute('aria-expanded', String(isOpen));
});

// --- Populate year checkboxes (1995–2025)
const yearGrid   = document.getElementById('yearGrid');
const startYear  = 1995;
const endYear    = 2025;

for (let y = startYear; y <= endYear; y++) {
    const label = document.createElement('label');
    label.className = 'year-item';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = 'year';   // multiple values: ?year=1995&year=1996...
    cb.value = String(y);

    const text = document.createTextNode(String(y));
    label.appendChild(cb);
    label.appendChild(text);
    yearGrid.appendChild(label);
}

// Optional: preserve filter open if any year is preselected (e.g., via back nav)
window.addEventListener('DOMContentLoaded', () => {
    const anyChecked = [...document.querySelectorAll('input[name="year"]')].some(el => el.checked);
    if (anyChecked) {
    filterPanel.classList.add('open');
    filterPanel.setAttribute('aria-hidden', 'false');
    filterToggle.setAttribute('aria-expanded', 'true');
    }
});

fetch('https://software-update-backend.onrender.com/api/updates?year=2020&year=2021')
  .then(res => res.json())
  .then(data => {
    console.log(data); // Display updates
  });
