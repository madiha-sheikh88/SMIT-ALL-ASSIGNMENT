// ---- dummy data added ----
let employees = [
    { employeeId: 'EMP001', fullName: 'Sarah Khan', email: 'sarah.khan@company.com', phone: '+92 300 1234567', department: 'Human Resources', position: 'HR Manager', salary: 145000, doj: '2022-01-12', status: 'Active' },
    { employeeId: 'EMP002', fullName: 'Ahmed Raza', email: 'ahmed.raza@company.com', phone: '+92 301 9876543', department: 'Engineering', position: 'Software Engineer', salary: 180000, doj: '2023-03-05', status: 'Active' },
    { employeeId: 'EMP003', fullName: 'Fatima Iqbal', email: 'fatima.iqbal@company.com', phone: '+92 302 4567891', department: 'Finance', position: 'Accountant', salary: 110000, doj: '2021-07-20', status: 'Inactive' },
    { employeeId: 'EMP004', fullName: 'Bilal Ahmed', email: 'bilal.ahmed@company.com', phone: '+92 333 1122334', department: 'Marketing', position: 'Marketing Lead', salary: 160000, doj: '2022-11-02', status: 'Active' }
];

// chart added from chart.js library in dashboard.html file
//  setup chart 1

// Chart 1
const data1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Employees',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)',
      'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

new Chart(document.getElementById("employeeChart"), {
  type: 'bar',
  data: data1,
  options: { scales: { y: { beginAtZero: true } } }
});

// chart 2

const data2 = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

new Chart(document.getElementById("departmentChart"),{
  type: 'doughnut',
  data: data2,
});

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
