<script>
    import { onMount } from 'svelte';
    import { auth } from '$lib/firebase/firebase.js'; // Import your Firebase auth instance
    import { goto } from '$app/navigation'; // Import the goto function from SvelteKit
  
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
  </script>
  
  <h1 class="h1" style="color: darkgreen;">Congratulations! You successfully logged into your account.</h1>
  <button class="button" type="button" on:click={handleLogout}>Logout</button>
  <h2 style="color: {isBlue ? 'blue' : 'orange'};" class="h2">Welcome</h2>
  
  <style>
    .h2 {
      margin-left: 600px;
      margin-top: 195px;
      font-weight: bold;
      font-size: 70px;
    }
    .h1 {
      margin-left: 10px;
      margin-top: 30px;
      font-weight: normal;
      font-size: 20px;
    }
    .button {
      margin-left: 1300px;
      margin-top: -20px;
      background-color: #ed161a;
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
    }
  </style>
  