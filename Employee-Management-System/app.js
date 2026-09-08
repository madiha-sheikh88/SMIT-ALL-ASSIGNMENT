
// ---- dummy data added ----
let employees = [
    { employeeId: 'EMP001', fullName: 'Sarah Khan', email: 'sarah.khan@company.com', phone: '+92 300 1234567', department: 'Human Resources', position: 'HR Manager', salary: 145000, doj: '2022-01-12', status: 'Active' },
    { employeeId: 'EMP002', fullName: 'Ahmed Raza', email: 'ahmed.raza@company.com', phone: '+92 301 9876543', department: 'Engineering', position: 'Software Engineer', salary: 180000, doj: '2023-03-05', status: 'Active' },
    { employeeId: 'EMP003', fullName: 'Fatima Iqbal', email: 'fatima.iqbal@company.com', phone: '+92 302 4567891', department: 'Finance', position: 'Accountant', salary: 110000, doj: '2021-07-20', status: 'Inactive' },
    { employeeId: 'EMP004', fullName: 'Bilal Ahmed', email: 'bilal.ahmed@company.com', phone: '+92 333 1122334', department: 'Marketing', position: 'Marketing Lead', salary: 160000, doj: '2022-11-02', status: 'Active' }
];
//  form submission and table rendering logic
const form = document.getElementById('registration-form');
const submitBtn = form.querySelector('button[type="submit"]');
const tableBody = document.getElementById('employeeTableBody'); // now targets <tbody>
let editingId = null;

// ---- RENDER: rebuilds tbody rows from the `employees` array ----
function renderTable(dataToRender = employees) {
    tableBody.innerHTML = ''; // safe now — <thead> is separate, untouched

    dataToRender.forEach(emp => {
        const formattedSalary = 'PKR ' + Number(emp.salary).toLocaleString('en-US');
        const formattedDate = new Date(emp.doj).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const statusClass = emp.status === 'Active' ? 'badge-active' : 'badge-inactive';

        const row = document.createElement('tr');
        row.dataset.employeeId = emp.employeeId;
        row.innerHTML = `
            <td>#${emp.employeeId}</td>
            <td class="fw-semibold">${emp.fullName}</td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td>${formattedSalary}</td>
            <td>${formattedDate}</td>
            <td><span class="badge-status ${statusClass}">${emp.status}</span></td>
            <td>
                <div class="d-flex gap-2 justify-content-center">
                    <button type="button" class="btn-action btn-view" title="View">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button type="button" class="btn-action btn-edit" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                        </svg>
                    </button>
                    <button type="button" class="btn-action btn-delete" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ---- FORM SUBMIT: Add new employee OR update existing one ----
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone-number').value.trim();
    const employeeId = document.getElementById('Employee-ID').value.trim();
    const department = document.getElementById('Department').value.trim();
    const position = document.getElementById('Position').value.trim();
    const salary = document.getElementById('salary').value.trim();
    const doj = document.getElementById('doj').value.trim();
    const status = document.getElementById('status').value.trim();

    let isFormValid = true;
    if (fullName === "") { alert("Please enter full name."); document.getElementById('full-name').focus(); isFormValid = false; }
    else if (!email.includes('@') || !email.includes('.')) { alert("Please enter a valid email address."); document.getElementById('email').focus(); isFormValid = false; }
    else if (phone === "") { alert("Please enter phone number."); document.getElementById('phone-number').focus(); isFormValid = false; }
    else if (employeeId === "") { alert("Please enter Employee ID."); document.getElementById('Employee-ID').focus(); isFormValid = false; }
    else if (department === "") { alert("Please select a department."); document.getElementById('Department').focus(); isFormValid = false; }
    else if (position === "") { alert("Please enter position."); document.getElementById('Position').focus(); isFormValid = false; }
    else if (salary === "") { alert("Please enter salary."); document.getElementById('salary').focus(); isFormValid = false; }
    else if (doj === "") { alert("Please select date of joining."); document.getElementById('doj').focus(); isFormValid = false; }
    else if (status === "") { alert("Please select status."); document.getElementById('status').focus(); isFormValid = false; }

    if (!isFormValid) return;

    const employeeData = { employeeId, fullName, email, phone, department, position, salary, doj, status };

    if (editingId) {
        const index = employees.findIndex(emp => emp.employeeId === editingId);
        if (index !== -1) employees[index] = employeeData;
        editingId = null;
        submitBtn.textContent = 'Add New Employee';
        alert("Employee updated successfully!");
    } else {
        employees.push(employeeData);
        alert("Your form is submitted successfully!");
    }

    renderTable();
    form.reset();
});

// ---- TABLE CLICK: View / Edit / Delete ----
tableBody.addEventListener('click', function (e) {
    const row = e.target.closest('tr');
    if (!row) return;
    const empId = row.dataset.employeeId;
    const emp = employees.find(emp => emp.employeeId === empId);
    if (!emp) return;

    if (e.target.closest('.btn-delete')) {
        const confirmDelete = confirm(`Are you sure you want to delete ${emp.fullName}? This cannot be undone.`);
        if (confirmDelete) {
            employees = employees.filter(e => e.employeeId !== empId);
            renderTable();
        }
        return;
    }

    if (e.target.closest('.btn-view')) {
        const formattedSalary = 'PKR ' + Number(emp.salary).toLocaleString('en-US');
        const formattedDoj = new Date(emp.doj).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        alert(
            `Employee ID: #${emp.employeeId}\nName: ${emp.fullName}\nEmail: ${emp.email}\n` +
            `Phone: ${emp.phone}\nDepartment: ${emp.department}\nPosition: ${emp.position}\n` +
            `Salary: ${formattedSalary}\nDate of Joining: ${formattedDoj}\nStatus: ${emp.status}`
        );
        return;
    }

    if (e.target.closest('.btn-edit')) {
        document.getElementById('full-name').value = emp.fullName;
        document.getElementById('email').value = emp.email;
        document.getElementById('phone-number').value = emp.phone;
        document.getElementById('Employee-ID').value = emp.employeeId;
        document.getElementById('Department').value = emp.department;
        document.getElementById('Position').value = emp.position;
        document.getElementById('salary').value = emp.salary;
        document.getElementById('doj').value = emp.doj;
        document.getElementById('status').value = emp.status;

        editingId = emp.employeeId;
        submitBtn.textContent = 'Update Employee';
        form.scrollIntoView({ behavior: 'smooth' });
        return;
    }
});


// ---- SEARCH ----
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('input[type="search"]');

function filterTable() {
    const query = searchInput.value.trim().toLowerCase();
    if (query === '') {
        renderTable(employees);
        return;
    }
    const filtered = employees.filter(emp =>
        Object.values(emp).some(val => String(val).toLowerCase().includes(query))
    );
    renderTable(filtered);
}

searchInput.addEventListener('input', filterTable);
searchForm.addEventListener('submit', e => { e.preventDefault(); filterTable(); });

// ---- SORT: by selected field (Name, Department, Salary, Joining Date) ----
const sortFieldSelect = document.getElementById('sortField');
const sortDirectionBtn = document.getElementById('sortDirectionBtn');
const sortDirectionLabel = document.getElementById('sortDirectionLabel');
let sortAscending = true;

function applySort() {
    const field = sortFieldSelect.value;

    employees.sort((a, b) => {
        let valA = a[field];
        let valB = b[field];

        // Numeric comparison for salary
        if (field === 'salary') {
            valA = Number(valA);
            valB = Number(valB);
            return sortAscending ? valA - valB : valB - valA;
        }

        // Date comparison for joining date
        if (field === 'doj') {
            valA = new Date(valA);
            valB = new Date(valB);
            return sortAscending ? valA - valB : valB - valA;
        }

        // Text comparison for name / department
        return sortAscending
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });

    renderTable();
}

// Re-sort whenever the field changes
sortFieldSelect.addEventListener('change', applySort);

// Toggle direction on button click
sortDirectionBtn.addEventListener('click', function () {
    sortAscending = !sortAscending;
    sortDirectionLabel.textContent = sortAscending ? 'Asc' : 'Desc';
    applySort();
});

// ---- INITIAL RENDER on page load ----
renderTable();


// employees dashboard update

function updateDashboardStats() {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
    const inactiveEmployees = employees.filter(emp => emp.status === 'Inactive').length;
    const totalDepartments = new Set(employees.map(emp => emp.department)).size;

    document.getElementById('statTotalEmployees').textContent = totalEmployees;
    document.getElementById('statActiveEmployees').textContent = activeEmployees;
    document.getElementById('statInactiveEmployees').textContent = inactiveEmployees;
    document.getElementById('statTotalDepartments').textContent = totalDepartments;
}
updateDashboardStats();
