/* =====================================================
   SECTION 1: SUPABASE CONNECTION
   ===================================================== */
const {createClient} = supabase;
const supabaseUrl = 'https://khthtzzwrdkxrejmzlvg.supabase.co';
const supabaseKey = 'sb_publishable_a2ZoWuGXkzc3fusG3jg67Q_Czt9fnBM';
const supabaseClient = createClient (supabaseUrl, supabaseKey);
const TABLE_NAME = 'students';


/* =====================================================
   SECTION 2: GRAB HTML ELEMENTS
   ===================================================== */
const form = document.getElementById('database-form');
const rollInput = document.getElementById('student-roll');
const nameInput = document.getElementById('student-name');
const emailInput = document.getElementById('student-email');
const courseInput = document.getElementById('student-course');

const updateBtn = document.getElementById('update-btn');
const deleteBtn = document.getElementById('delete-btn');
const syncBtn = document.getElementById('sync-btn');


/* =====================================================
   SECTION 3: CREATE (INSERT A NEW STUDENT)
   ===================================================== */
async function createStudent(event) {
    event.preventDefault();

const student ={
        rollno: rollInput.value.trim(),
        full_name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value.trim()
    };

    const { error } = await supabaseClient
        .from(TABLE_NAME)
        .insert(student);

    if (error) {
    console.log(error);
    alert('Could not add student: ' + error.message);
    return;
} else{

    alert('Student added successfully!');
    }
    form.reset();
}

// /* =====================================================
//    SECTION 4: READ (FETCH ONE STUDENT BY ROLL NUMBER)
//    ===================================================== */
async function readStudent() {
    const roll = rollInput.value.trim();

    if (roll === '') {
        alert('Type a roll number first, then press Sync Data.');
        return;
    }

    const { data, error } = await supabaseClient
        .from(TABLE_NAME)
        .select('*')
        .eq('rollno', roll)
        .maybeSingle();

    if (error) {
        alert('Could not fetch student: ' + error.message);
        return;
    }

    if (data === null) {
        alert('No student found with roll number ' + roll);
        return;
    }

    nameInput.value = data.full_name;
    emailInput.value = data.email;
    courseInput.value = data.course;
}


// /* =====================================================
//    SECTION 6: UPDATE (CHANGE AN EXISTING STUDENT)
//    ===================================================== */
async function updateStudent() {
    const student ={
        rollno: rollInput.value.trim(),
        full_name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value.trim()
    };

    if (student.rollno === '') {
        alert('Type the roll number of the student you want to update.');
        return;
    }

    const { rollno, ...changes } = student;

    const { data, error } = await supabaseClient
        .from(TABLE_NAME)
        .update(changes)
        .eq('rollno', rollno)
        .select();

    if (error) {
        alert('Could not update student: ' + error.message);
        return;
    }

    if (data.length === 0) {
        alert('Nothing was updated. Check the roll number (or your table policies).');
        return;
    }

    alert('Student updated successfully!');
}


// /* =====================================================
//    SECTION 6: DELETE (REMOVE A STUDENT)
//    ===================================================== */
async function deleteStudent() {
    const roll = rollInput.value.trim();

    if (roll === '') {
        alert('Type the roll number of the student you want to delete.');
        return;
    }

    const sure = confirm('Delete student ' + roll + '? This cannot be undone.');
    if (!sure) {
        return;
    }

    const { data, error } = await supabaseClient
        .from(TABLE_NAME)
        .delete()
        .eq('rollno', roll)
        .select();

    if (error) {
        alert('Could not delete student: ' + error.message);
        return;
    }

    if (data.length === 0) {
        alert('Nothing was deleted. Check the roll number (or your table policies).');
        return;
    }

    alert('Student deleted.');
    form.reset();
}


// /* =====================================================
//    SECTION 7: CONNECT BUTTONS TO FUNCTIONS
//    ===================================================== */
form.addEventListener('submit', createStudent);
updateBtn.addEventListener('click', updateStudent);
deleteBtn.addEventListener('click', deleteStudent);
syncBtn.addEventListener('click', readStudent);