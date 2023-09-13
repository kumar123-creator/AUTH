
<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/firebase/firebase.js'; // Import your Firebase auth instance
  import { goto } from '$app/navigation'; // Import the goto function from SvelteKit
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  let users = [];


  let email = ''; // Define email in a scope accessible to the entire script
  
 

  let isBlue = true; 

  onMount(() => {
    // Create an interval to toggle the color every 2 seconds
    const interval = setInterval(() => {
      isBlue = !isBlue;
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  });

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
 



onMount(() => {
// Fetch the user data from Firebase Authentication
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    const userData = {
      email: user.email,
      createdAt: user.metadata.creationTime,
      lastSignIn: user.metadata.lastSignInTime,
      uid: user.uid,
    };
    users = [...users, userData];
  } else {
    // User is signed out
    console.log('User is signed out');
  }
});
});
</script>
<main>

<h1 class="h1" style="color: darkgreen;">Congratulations! You successfully logged into your account.</h1>
<h2 style="color: {isBlue ? 'green' : 'orange'};" class="h2">Welcome {email}</h2>



<Table  color="blue" hoverable={true} >
<TableHead >
  <TableHeadCell>Email</TableHeadCell>
  <TableHeadCell>Created At</TableHeadCell>
  <TableHeadCell>last SignIn</TableHeadCell>
  <TableHeadCell>UID</TableHeadCell>
</TableHead>
<tbody>
  {#each users as user}

  <TableBodyRow>
    <TableBodyCell>{user.email}</TableBodyCell>
    <TableBodyCell>{user.createdAt}</TableBodyCell>
    <TableBodyCell>{user.lastSignIn}</TableBodyCell>
    <TableBodyCell>{user.uid}</TableBodyCell>
  </TableBodyRow>

  {/each}
</tbody>
</Table>
<button class="button" type="button" on:click={handleLogout}>Logout</button>
</main>
<style>
  .h2 {
    margin-left: 600px;
    margin-top: 205px;
    font-weight: bold;
    font-size: 50px;
  }
  .h1 {
    margin-left: 10px;
    margin-top: 30px;
    font-weight: normal;
    font-size: 20px;
  }
  .button {
    margin-left:5px;
    margin-top: 30px;
    background-color: #ed161a;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }
</style>
