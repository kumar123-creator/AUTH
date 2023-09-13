<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/firebase/firebase.js';
  import { goto } from '$app/navigation';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { getDatabase, ref, onValue } from 'firebase/database'; // Import Firebase Realtime Database functions

  let users = [];

  let email = '';
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
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      auth.signOut().then(() => {
        console.log("User logged out");
        goto('/');
      }).catch((error) => {
        console.error("Logout error:", error);
      });
    }
  }

  onMount(() => {
    // Fetch the user data from Firebase Authentication
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          email: user.email,
          firstname: user.firstName,
          lastName: user.lastName,
        };
        users = [...users, userData];
      } else {
        console.log('User is signed out');
      }
    });

    // Fetch data from Firebase Realtime Database
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        // Convert the snapshot value to an array of users
        const userData = snapshot.val();
        const userList = Object.keys(userData).map((key) => userData[key]);
        users = userList;
      } else {
        // Handle the case where there is no data
        console.log('No user data in the database.');
      }
    });
  });
</script>

<main>
  <h1 class="h1" style="color: darkgreen;">Congratulations! You successfully logged into your account.</h1>
  <h2 style="color: {isBlue ? 'green' : 'orange'};" class="h2">Welcome {email}</h2>

  <Table  hoverable={true}>
    <TableHead>
      <TableHeadCell>Email</TableHeadCell>
      <TableHeadCell>First Name</TableHeadCell>
      <TableHeadCell>Last Name</TableHeadCell>
    </TableHead>
    <tbody>
      {#each users as user}
        <TableBodyRow>
          <TableBodyCell>{user.email}</TableBodyCell>
          <TableBodyCell>{user.firstName}</TableBodyCell>
          <TableBodyCell>{user.lastName}</TableBodyCell>
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
    margin-left: 5px;
    margin-top: 30px;
    background-color: #ed161a;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }
</style>
