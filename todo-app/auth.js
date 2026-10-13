const { createClient } = supabase;

const supabaseURL = 'https://byftjrxoqqpffyxerrxr.supabase.co';
const supabaseKey = 'sb_publishable_oGzW1syByD0NH4APTDDC2Q_94Fl31CC';

const supabaseclient = createClient(supabaseURL, supabaseKey);

// Selected DOM elements
const signupForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');

// Handling form submission
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;


  const { data, error } = await supabaseclient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: name, 
      }
    }
  });

  if (error) {
    console.log("this is error", error);
    alert(`Signup failed: ${error.message}`); 
  } else {
    alert('Sign up successful!');
    signupForm.reset(); 
   window.location.href = "./signin.html"
  }

}); 