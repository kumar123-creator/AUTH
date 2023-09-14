
<script>
  import { onMount } from "svelte";
  import { auth } from '$lib/firebase/firebase.js';
  import { goto } from '$app/navigation';
  import {Table} from "flowbite-svelte";
 
 let candidates = [];
    let isLoading = true;
    let isAddPopupOpen = false;
	  let newCandidate = {
	  firstName: "",
	  surname: "",
	  mobile: "",
	  email: "",
	};
  
    let selectedCandidate = null;
	let isPopupOpen = false;
    /**
   * @type {{ firstName: any; surname: any; email: any; } | null}
   */
    let candidateToDelete = null;
    let isDeleteConfirmPopupOpen = false;
  
  
    onMount(async () => {
      candidates = await fetchCandidates();
      isLoading = false;
    });

       function openAddPopup() {
  newCandidate = {
    firstName: "",
    surname: "",
    mobile: "",
    email: ""
    // Reset other properties
  };
  isAddPopupOpen = true;
}
    
const API_KEY = "TEST1236C4CF23E6921C41429A6E1D546AC9535E";
const BASE_URL = "https://api.recruitly.io/api/";

 async function fetchCandidates() {
  const apiKey = API_KEY;
  const apiUrl = `${BASE_URL}candidate?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error("Invalid API response:", data);
      return [];
    }
} catch (error) {
    console.error("Error fetching candidates:", error);
  } finally {
    isLoading = false; // Set isLoading to false when done loading
  }
}



   async function addCandidate(newCandidate) {
    // Make an API call to add the new candidate
    const response = await fetch(`https://api.recruitly.io/api/candidate?apiKey=TEST1236C4CF23E6921C41429A6E1D546AC9535E`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCandidate)
      // Add any necessary authentication headers or tokens
    });
  
    if (response.ok) {
      // Candidate added successfully on the server
      console.log("Candidate added successfully!");
      console.log(newCandidate);
      
      // Add the new candidate to the local candidates array
      candidates.push(newCandidate);
      isAddPopupOpen = false; // Close the popup after adding
    } else {
      // Handle error if adding candidate on server failed
      console.error('Failed to add candidate on the server');
    }
  }
  

   async function editCandidate(updatedCandidate) {
    // Find the index of the selectedCandidate in the candidates array
    const index = candidates.findIndex(candidate => candidate.id === updatedCandidate.id);

    if (index !== -1) {
      candidates[index] = updatedCandidate;

      // Make an API call to update the server
      const response = await fetch(`https://api.recruitly.io/api/candidate?apiKey=TEST1236C4CF23E6921C41429A6E1D546AC9535E`, {
        method: 'POST', // Use PUT method to update existing data
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCandidate) // Send the updated candidate data
        // Add any necessary authentication headers or tokens
      });

      if (response.ok) {
        // Candidate updated successfully on the server
        console.log("Candidate updated successfully!");
        console.log(updatedCandidate);
      } else {
        // Handle error if update on server failed
        console.error('Failed to update candidate on the server');
      }
    }

    isPopupOpen = false; // Close the popup after editing
  }

    

async function deleteCandidate(candidate) {
    const apiKey = "TEST1236C4CF23E6921C41429A6E1D546AC9535E";
    const deleteUrl = `https://api.recruitly.io/api/candidate/${candidate.id}?apiKey=${apiKey}`;
  
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Candidate deleted successfully on the server
        console.log("Candidate deleted successfully!");
  
        // Remove the deleted candidate from the candidates array
        candidates = candidates.filter(c => c.id !== candidate.id);
        isDeleteConfirmPopupOpen = false; // Close the delete popup
      } else {
        // Handle error if deletion on server failed
        console.error('Failed to delete candidate on the server');
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  }

    function openEditPopup(candidate) {
    selectedCandidate = { ...candidate }; 
    isPopupOpen = true;
  }


  

  function confirmDelete(candidate) {
  candidateToDelete = candidate;
  isDeleteConfirmPopupOpen = true;
}
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

</script>

<h1 class="h1" style="color: black;">You have successfully login  into your account.</h1>
<main>
  <h2 class="table-heading">CANDIDATE LIST</h2>
  <button class="add-button" on:click={() => openAddPopup()}>Add Candidate</button>
  
    {#if isLoading}
      <p>Loading candidates...</p>
    {:else}
      <Table class="styled-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Job Title</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>ID</th>
            <th>Location</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {#each candidates as candidate}
            <tr>
              <td>{candidate.firstName}</td>
              <td>{candidate.surname}</td>
              <td>{candidate.jobTitle}</td>
              <td>{candidate.email}</td>
              <td>{candidate.mobile}</td>
              <td>{candidate.id}</td>
              <td>{candidate.address.cityName}, {candidate.address.countryName}</td>
              <td><button class="edit-button" on:click={() => openEditPopup(candidate)}>Edit</button></td>
              <td><button class="delete-button" on:click={() => confirmDelete(candidate)}>Delete</button></td>
            </tr>
          {/each}
        </tbody>
      </Table>
    {/if}
  
    {#if isAddPopupOpen}
    <div class="popup-background">
      <div class="popup-content">
        <form class="form">
          <h3>Add Candidate</h3>
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" id="first_name" bind:value={newCandidate.firstName} />
          </div>
          <div class="form-group">
            <label for="last_name">Surname</label>
            <input type="text" id="last_name" bind:value={newCandidate.surname} />
          </div>
          <div class="form-group">
            <label for="phone">Mobile</label>
            <input type="tel" id="phone" bind:value={newCandidate.mobile} />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" bind:value={newCandidate.email} />
          </div>
          <div class="form-buttons">
            <button on:click={() => addCandidate(newCandidate)}>Add</button>
            <button on:click={() => isAddPopupOpen = false} class="alternative">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    {/if}
    
  
    
  {#if selectedCandidate}
  <div class="popup-background" style="display: {isPopupOpen ? 'block' : 'none'}">
    <div class="popup-content edit-popup-content">
      <form class="form">
        <h3>Edit Candidate</h3>
        <div class="form-group">
          <label for="first_name">First Name</label>
          <input type="text" id="first_name" bind:value={selectedCandidate.firstName} />
        </div>
        <div class="form-group">
          <label for="last_name">Surname</label>
          <input type="text" id="last_name" bind:value={selectedCandidate.surname} />
        </div>
        <div class="form-group">
          <label for="phone">Mobile</label>
          <input type="tel" id="phone" bind:value={selectedCandidate.mobile} />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" bind:value={selectedCandidate.email} />
        </div>
        <div class="form-buttons">
          <button on:click={() => editCandidate(selectedCandidate)}>Save</button>
          <button on:click={() => isPopupOpen = false} class="alternative">Cancel</button>
        </div>
      </form>
    </div>
  </div>
  {/if}
  
  {#if isDeleteConfirmPopupOpen}
  <div class="popup-background">
    <div class="popup-content delete-popup-content">
      <p>Are you sure you want to delete the following candidate?</p>
      <p>Name: {candidateToDelete.firstName} {candidateToDelete.surname}</p>
      <p>Email: {candidateToDelete.email}</p>
      <div class="form-buttons">
        <button on:click={() => deleteCandidate(candidateToDelete)}>Yes</button>
        <button on:click={() => isDeleteConfirmPopupOpen = false} class="alternative">Cancel</button>
      </div>
    </div>
  </div>
  {/if}
</main>
<button class="button" type="button" on:click={handleLogout}>Logout</button>


<style>

 .h1 {
   margin-left: 10px;
   margin-top: 30px;
   font-weight: normal;
   font-size: 20px;
 }
 .button {
   margin-left: 10px;
   margin-top: -50px;
   background-color: blue;
   color: white;
   padding: 10px 15px;
   border: none;
   cursor: pointer;
 }

 .table-heading {
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: x-large; 
    color: darkblue;
  }

  .add-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 3px;
    background-color: purple;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .edit-button {
    background-color: blue;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

  .delete-button {
    background-color: red;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

:global(.styled-table) {
	  width: 100%;
	  border-collapse: collapse;
	  border: 1px solid #ccc;
	  font-size: 14px;
	}
  
	:global(.styled-table th, .styled-table td) {
	  border: 1px solid #ccc;
	  padding: 8px;
	  text-align: left;
	}
  
	:global(.styled-table th) {
	  background-color: #f2f2f2;
	  font-weight: bold;
	}
  
	:global(.styled-table tbody tr:hover) {
	  background-color: #f5f5f5;
	}

.popup-content.edit-popup-content {
background-color:lavender;
padding: 20px;
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
width: 400px;
height: 510px;
text-align: center; /* Center the content horizontally */
margin-left:550px;
margin-top: 100px;
}

.popup-content.delete-popup-content {
  width: 500px; /* Adjust the width as needed */
  height: 170px; /* Adjust the height as needed */
  background-color: lavender; /* Example background color for delete popup */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center the content horizontally */
  margin-left:50px;
  margin-top: 20px;
  font-size: medium;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
}

.popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px;
}
.popup-content h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: darkblue /* Adjust the color as needed */
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  text-align: left;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: purple;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid black;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.form-buttons button {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  color: #f2f2f2;
  background-color: blue;
}

.form-buttons .alternative {
  background-color: red;
  color: white;
}
</style>