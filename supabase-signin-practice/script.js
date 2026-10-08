const {createClient} = supabase;
const supabaseUrl = 'https://khthtzzwrdkxrejmzlvg.supabase.co';
const supabaseKey = 'sb_publishable_a2ZoWuGXkzc3fusG3jg67Q_Czt9fnBM';
const supabaseClient = createClient (supabaseUrl, supabaseKey);



// Get both form boxes
const signinBox = document.getElementById("signinBox");
const signupBox = document.getElementById("signupBox");

// Get switch buttons
const showSignup = document.getElementById("showSignup");
const showSignin = document.getElementById("showSignin");


// Show Sign Up
if (showSignup && showSignin) {
showSignup.addEventListener("click", function () {

    signinBox.classList.add("hidden");
    signupBox.classList.remove("hidden");

});


// Show Sign In
showSignin.addEventListener("click", function () {

    signupBox.classList.add("hidden");
    signinBox.classList.remove("hidden");

});
} 

// Sign Up form
const signupForm = document.getElementById("signupForm");
if (signupForm) {
signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }
const { data, error } = await supabaseClient.auth.signUp({
    email: email,
  password: password,
});
if (error) {
    console.log("There is an error", error);
}
// Get the newly created user's ID
const user = data.user;

// Add the user's name to our profiles table
const { error: profileError } = await supabaseClient
    .from("profile")
    .insert({
        id: user.id,
        name: name
    });

if (profileError) {
    console.log("Profile error:", profileError);
    alert(profileError.message);
    return;
}
    alert("Sign Up form submitted!");
}); 
}
// Sign In form
const signinForm = document.getElementById("signinForm");
if (signinForm) {
signinForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;
    const { data, error } = await supabaseClient.auth.signInWithPassword({
  email: email,
  password: password,
});
if (error){
    console.log("there is an error", error);
} else{

    alert("Sign In successfully!");
     window.location.href = "./dashboard.html";
}
});
}
// ===== SIGN OUT =====
const logoutBtn = document.getElementById("logout-btn");

// Only attach the listener if the button exists on this page
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    // Ask Supabase to end the session and clear it from the browser
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      // Something went wrong, so show the reason and stay on the page
      console.log("Sign out error:", error);
      alert(error.message);
      return;
    }

    // Success: send the user to the login page
    window.location.href = "./index.html";
  });
}

// fetch user name
async function loadUserProfile() {

    // Get the currently signed-in user
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();

    if (userError) {
        console.log("User error:", userError);
        return;
    }

    const user = userData.user;

    // Get this user's profile from profiles table
    const { data, error } = await supabaseClient
        .from("profile")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        console.log("Profile fetch error:", error);
        return;
    }

    // Put the name inside the HTML
    document.getElementById("userName").innerText = data.name;
}

loadUserProfile();



// ===== DELETE DATA =====

async function deleteNote(id) {
  // Delete only the row whose id matches
  const { error } = await supabaseClient
    .from("profile")
    .delete()
    .eq("id", id); // eq = "equals": without this, nothing is targeted

  if (error) {
    console.log("Delete error:", error);
    alert(error.message);
    return;
  }
alert("Profile deleted successfully!");
// Sign the user out, because their profile no longer exists
  await supabaseClient.auth.signOut();

  // Go to the sign in page
  window.location.href = "./index.html";
}

const deleteBtn = document.getElementById("delete-btn");

if (deleteBtn) {

  deleteBtn.addEventListener("click", async () => {

    // Ask Supabase who is currently signed in
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();

    // If nobody is signed in...
    if (userError || !userData.user) {
      // ...tell the user
      alert("You are not signed in.");
      // ...and stop here
      return;
    }

    // Call the delete function with the signed-in user's id and wait for it to finish
    await deleteNote(userData.user.id);
  });
}



