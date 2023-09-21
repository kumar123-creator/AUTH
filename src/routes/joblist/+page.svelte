<script>
    import { onMount } from "svelte";
    import { auth } from '$lib/firebase/firebase.js';
    import { goto } from '$app/navigation';
    import Grid from "gridjs-svelte";
  
    let jsonData = [];
    let tableVisible = false;
  
    onMount(async () => {
      const response = await fetch("https://api.recruitly.io/api/job?apiKey=TEST64518616D4CF145D4E20BD47169EA7229BA3");
      const responseData = await response.json();
      jsonData = responseData.data;
      tableVisible = true; // Show the table immediately
    });
  
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
  
    function candidatelist() {
      goto('/candidatelist');
    }
  
    function joblist() {
      goto('/joblist');
    }
  
  </script>
  
  <main>
    <h2 class="h2" style="color: green;">JOBS LISTING</h2>
    {#if tableVisible}
      <Grid
        search
        sort
        pagination={{ enabled: true, limit: 38 }}
        data={jsonData.map(item => ({
          title: item.title,
          jobType: item.jobType,
          status: item.status,
          experience: item.experience,
          industry: item.industry,
        }))} />
    {/if}
  </main>
  
  <button class="candidatelist-button" type="button" on:click={candidatelist}>Candidates</button>
  <button class="joblist-button" type="button" on:click={joblist}>Jobs</button>
  <button class="button bottom-right" type="button" on:click={handleLogout}>Logout</button>
  
  <style global>
    @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
  
    .h2 {
      margin-left: 650px;
      margin-top: 90px;
      font-weight: bold;
      font-size: 20px;
    }
  
    .bottom-right {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  
    .button {
    position: absolute;
    top: 0;
    left: 220px;
    margin: 3px;
    height: 35px;
    width: 100px;
    background-color: red;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

    .candidatelist-button {
      position: absolute;
      top: 0;
      left: 0;
      margin: 3px;
      background-color: blue;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .joblist-button {
      position: absolute;
      top: 0;
      left: 110px;
      margin: 3px;
      width: 100px;
      background-color: purple;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }


  </style>
  