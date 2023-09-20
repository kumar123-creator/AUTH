<script>
  import { auth } from '$lib/firebase/firebase.js';
  import { goto } from '$app/navigation';
  import { Card } from 'flowbite-svelte';

  let isPopupVisible = false;
  
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

function togglePopup() {
    isPopupVisible = !isPopupVisible;
  }

  function openBusinessProfile() {
    goto('/business');
    togglePopup(); // Close the popup after clicking "Business Profile"
  }
</script>

<main>
  
  <button class="candidatelist-button" type="button" on:click={candidatelist}>Candidates</button>
  <button class="joblist-button" type="button" on:click={joblist}>Jobs</button>
  <button class="button top-right" type="button" on:click={handleLogout}>Logout</button>
 
  <div class="logo-container">
    <div class="logo-wrapper">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxByYdlAK5e7HyVnE_QyJ5RBP2Y8vlxuGjA&usqp=CAU" alt="Logo" class="logo-image" on:click={togglePopup}>
    </div>
    {#if isPopupVisible}
      <div class="popup">
        <div class="popup-content">
          <h1 class="popup-title">Click on the below button to open the business profile:</h1>
          <button class="business-button" type="button" on:click={openBusinessProfile}>Business Profile</button>
          <button class="close-button" type="button" on:click={togglePopup}>Close</button>
        </div>
      </div>
    {/if}
  </div>
  <h1 class="h1" style="color: black; margin-left: 300px;">You have successfully logged into your account</h1>
  <div class="card-container">
    <div class="grid grid-cols-3 gap-4">
      <Card class="small-card" style="width: 350px ; background-color:darkblue "  >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: white;"  >Revenue</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: white ;">£6,283,954</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: white; font-size: 80%;">£1,533,657</p>
      </Card>
      <Card class="small-card" style="width: 350px ;background-color:green  "  >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: white ; " >Productivity</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: white ; ">£2,094,651</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: white; font-size: 80%;">£511,219</p>
      </Card>
      <Card class="small-card" style="width: 350px ; " >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: black ; ">Jobs On</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: black ; ">54</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: black; font-size: 80%;">31</p>
      </Card>
      <Card class="small-card" style="width: 350px ; " >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: black ; ">Placements</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: black ; ">49</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: black; font-size: 80%;">70</p>
      </Card>
      <Card class="small-card" style="width: 350px ; " >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: black ">Invoice Not Sent</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">£301,192</p>
      </Card>
      <Card class="small-card" style="width: 350px ; background-color:darkmagenta" >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: white ; ">Andy. Barnes</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: white ; ">£6,202,725</p>
      </Card>
      <Card class="small-card" style="width: 350px ; background-color:blue   "  >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: white;"  >Invoiced</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: white;"  >£194,735</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: white; font-size: 80%;">£3,390</p>
      </Card>
      <Card class="small-card" style="width: 350px ; " >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: black ; ">Interviews  </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">0</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: black; font-size: 80%;">0</p>
      </Card>
      <Card class="small-card" style="width: 350px ;" >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: black ; ">CV Shares  </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color:black; ">132</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: black; font-size: 80%;">89</p>
      </Card>
    </div>
  </div>
</main>




<style>
   .card-container {
    margin-left: 250px;
    margin-top: 200px;
   
  }

.logo-container {
  position: relative;
}

.logo-wrapper {
  position: absolute;
  top: 10px; /* Adjust the top position as needed */
  right: 10px; /* Adjust the right position as needed */
  width: 70px;
  height: 70px;
  border-radius: 50%; /* Create a circular shape */
  overflow: hidden;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  
}


.logo-image {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

  
  .h1 {
    font-weight: normal;
    font-size: 30px;
    margin-bottom: 20px; 
  
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
  .business-button {
    background-color: green;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    margin: 10px; /* Add some spacing around the buttons */
  }
  .popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure the popup is on top of everything */
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.popup-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.close-button {
  background-color: red;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}

.close-button:hover {
  background-color: darkred;
}

  </style>
  