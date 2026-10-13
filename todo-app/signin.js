const { createClient } = supabase;
const supabaseURL = 'https://byftjrxoqqpffyxerrxr.supabase.co';
const supabaseKey = 'sb_publishable_oGzW1syByD0NH4APTDDC2Q_94Fl31CC';
const supabaseclient = createClient(supabaseURL, supabaseKey);

// ===== 2. GET HTML ELEMENTS =====

const form = document.getElementById("signinForm");

// ===== 3. HANDLE SIGN IN =====

form.addEventListener("submit", async function (event) {
    // Stop the page from reloading
    event.preventDefault();

    // Read what the user typed
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Ask Supabase to sign the user in; it gives back data or an error
    const { error } = await supabaseclient.auth.signInWithPassword(
        { email, password });

    // If something went wrong (wrong password etc.), show the message
    if (error) {
        alert(error.message);
        return;
    }
    alert("Signed in successfully!");

    // Success: go to the todo page
    window.location.href = "./index.html";
});
