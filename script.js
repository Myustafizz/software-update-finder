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

// --- Fetch updates from backend based on selected years
function fetchUpdates() {
  const selectedYears = [...document.querySelectorAll('input[name="year"]:checked')]
    .map(cb => `year=${cb.value}`)
    .join('&');

  fetch(`/api/updates?${selectedYears}`)
    .then(res => res.json())
    .then(data => {
      console.log('Updates:', data);
      // You can display the data in the UI here
    })
    .catch(err => console.error('Error fetching updates:', err));
}

// --- Trigger fetch on Search button click
document.getElementById('searchButton').addEventListener('click', fetchUpdates);

