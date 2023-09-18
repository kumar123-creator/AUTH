<script>
  import { auth } from '$lib/firebase/firebase.js';
  import { goto } from '$app/navigation';

  
// Function to handle logout
function handleLogout() {
  // Display a confirmation dialog
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  
  if (confirmLogout) {
    // User confirmed, proceed with logout
    // You can use your Firebase auth instance to sign the user out
    // For example:
    auth.signOut().then(() => {
      // Handle successful logout, e.g., navigate to the /information page
      console.log("User logged out");
      goto('/'); // Navigate to the /information route
    }).catch((error) => {
      // Handle logout error, if any
      console.error("Logout error:", error);
    });
  }
}

function candidatelist() {
  goto('/candidatelist');
}
function joblist() {
  goto('/joblist');
}


</script>

<main>
  <h1 class="h1" style="color: black; margin-left: 300px;">You have successfully login  into your account</h1>
<button class="candidatelist-button" type="button" on:click={candidatelist}>Candidates</button>
<button class="joblist-button" type="button" on:click={joblist}>Jobs</button>
<button class="button top-right" type="button" on:click={handleLogout}>Logout</button>
</main>


<style>

  
  .h1 {
    font-weight: normal;
    font-size: 30px;
    margin-bottom: 20px; /* Add some spacing between the heading and buttons */
  }
  
  .button{
    background-color: red;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    margin: 10px; /* Add some spacing around the buttons */
  }
  .candidatelist-button {
    background-color: blue;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    margin: 10px; /* Add some spacing around the buttons */
  }
  .joblist-button {
    background-color: purple;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    margin: 10px; /* Add some spacing around the buttons */
  }
  </style>
  