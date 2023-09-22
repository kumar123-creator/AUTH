
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
    })

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
   let isPopupVisible = false;
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

   
function togglePopup() {
    isPopupVisible = !isPopupVisible;
  }

  function openBusinessProfile() {
    goto('/business');
    togglePopup(); // Close the popup after clicking "Business Profile"
  }

 </script>
 
 
 
 <main >
  <div class="header">
    <div class="user-actions">
      <div class="user-profile">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxByYdlAK5e7HyVnE_QyJ5RBP2Y8vlxuGjA&usqp=CAU" alt="User Profile" on:click={togglePopup} style="margin-left:0px;" >
  </div>
</div>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaoAAAB2CAMAAACu2ickAAAAwFBMVEX///8KJ2oAIGcAI2gAHWYAIWcAFWMFJWnEx9MACWBmb5RHXY8AGGQAAF4AHGXd4er3+PoqO3SXnbSCj7AADWEnRH/i5OlKW4q3u8oWNHTy8vU+VouDkbFmdp4AE2IAAF/S2ORbbZjq7fPJz94PLW8fOXa/xtavtso2SoCYpL8ABV9SYo8AC2COlK23v9KMmbihrMVseJ54hKZUaJenscl0fJwkQX54iKxZaJOdo7pAT4CAiaZCWY84SXxsdplgaY/Y6y9PAAATcElEQVR4nO1daV+qTB8WBpgsBFLUpCJkEcwS9Vip3XW+/7d6gBn2YbPFeg7Xi/t3HxuY5ZqZ/zpDp9OiRYsWLVr8P0FS9Nn85dqZcLwHzry+WM9nuiKdul0tUlDEs/500utyPM1CKgBgaYHr3pl/9meicur2tcAwtk+OzDGYozQgowrO01Y7dRtbeAtqde4AAZBoCsEKrHM+b5fWaaG/TFimlCfMFkObA/HUrf13IWkDmYfEfY+wEwKO2WitknESGK8WX4+mkC3OfNRO3ep/EEp/yNfY+TJk8W9uK7O+GbMD3ZgoHyw7NE7d9n8K+uaOrimjcguLlTf6qdv/78BYyMfxhMAvZqfuwb+C7ZD5CFMUJVjbU/fh38ALxX6MKU9iUW6rtn85pD8PR0qpJODDuhVYXwxxJ3ycKJ8rftc6L74U4oLslT0C3KLl6guhXH9QoUhCaNfVF+L5c3Y/DPW8lVdfBOX2U5ny9sB1qwd+CaSbul70uoDy4NSd+iZIy37f/j7vp20e5fUrhfxv2MLi+4TjJ7vv4kozP2z55sFa1c5bSSFC+j2bp37OebMc8Is6XHnd/WDPpGf685miKGYxqqjYuOB6BIDhdK79ErXkDMX1wGRZXXY0YO4uPuYjvfmQh7YQUKhwMYkmWZeBgFHhblVF9I/AXsV93VcW1dfeAhTMj5gxs8nnCyrUfqp8C7wpsbkhA8Y1JurJsX3Aza2myjD97qovx1c2Wnyi7ZsGPSyt+by8Ypod/PywsoHmeTaqKhHE7dl90KuL4yvr88fq6YAReFVVOZ5hC14hu2U1V1BFQW7x4yWW5DIsBVn1MfWrbd3LN9l5dtb9IFXi8Djtj1WZ4XTzuN/vHzfn16ZMzBcEVtnOjKmCtJBEMqFN3hzdr++Cvh92ZaefWkRLQFOQH2QW1oepesmnJnlLBPoI/o8834Xexd4Qcdq6oovabGP18qIHsjclVSOqoLW7TWHIq+Hsgerq6I59G0TDyEzIha8uATOjF32UqlEvPbaQZmgPLI3/yxASLSBDrUfZvVhSjClksisUPJdoFogqdqz5W3sCo/kwXKPA0Y7t2QkxDFrf+2Sqpil9mWEux+fuShMDInTRdt/Hl0KGLcEqSnZRbg4gQ5b6WqywI6rocX6TlAYT/B6hbFn+VCCZ8slUiQlFHQr0+X6WZUGf9RdUkk9+XGLFiX0nraWAYbG0Kqaq01lZqGHsm3ZMv06LL6HKjVcMDdZn5NUizqZ3IaOQ2ZTbcOLmLqVgqMVKYBlVHRe/hbEbdOeH4CuoEseRS4m9Noq3KmlmcsHQQW5T5cWSlhaXWFjALCxZSpW+QE3LKVK/AF9B1TZeAGb57FWQ9ODriA59AxILq1v44lKqOiv0Dvrix9tWOXwBVcom1tSZ94rZu3RoSk3bOZ6SLuqkx1Zm7AAubls5VVrgh6HgJE+VohnGbHZmiDXchLpmzK6urrzCFf0TZ1dnn+QdwVRlGv4hqsRhPPvBZVXMQrMepnHt+nL/er44LN6f+qv8k0sn0kSgWbQsyqnqYMWCz/AhzfbvB2vCy+bksHu1S9ecvnzcORO5+9AF1vhppWX+bPQfbUygsh/DeyqeibN+n6w9ad4zaUaXiaKS/ehhEkwy4dX//340OFmqpNVjP9uiVDXJuTVTE/Kff6wSCsZ/UbXay8GiecazvBiepy4XL9nhNt4irkCRGVtB1SWiKrOPbBeXtMD6BjqELMObh0EhWYp7mHAMi14DaZ5y0mWXQ54316g/C8pTsGBXw39yLV6YkBQi4+A9s0iO1HwSF1U2Js9xoQ4scB74y1AAZKm6BZzgFKyPpcOETQsgpRIqYieQpOjG/OWP4zi3A1skRMO0HSewINYdAC3Iw2V6romHcHNlzsnNOYYq7UKmU7kFkOUnW+Ick2yaz/gmWZ6ex2W1Z69+2POD1VsVeVo4nGWw9AUzK+THUVx4PMCHhMRGRXlUdAvy7jUmNFcyVLmq9yZhTJxoouO1B/bmcWcmqZ7IwV8k7Wpw3b1XeYZlvVkrd583tpZiQV+x+TgTZOVDejPyqsMDVMRFOVUKMvkgHVMlbS1ChAt01wSZNdpwBK8klNdRX9DQMX86khtSeo83gD4f1JxfVsaz/1LgxL/0uUTR4B/ZKidasr6IqqD3kKzN2TJuWggt7VQCE6mj269DLj0ZgaBa60ScT1xzZNcgK0xT2zuOD3htLQg8lVM1Q2oFGMYTYBAe/GJ5+a7X5QTcEHmX40pcxBYjZEHcIz6KrOCgxHXHDX2dvKMnxp+i8+quEcxucBn/goui5Wib+aGhD+RVhXovbAiqjHIRaGXCbfSLm5kD3Hw+NnlAcPoJ7Dj06WuH4ui+YKUOLtq4JF8Qdiun6hU9TcdZCwMkBKBw59zYojhzbzkZtVaYZrhSQrUG0lyPHg6HVI9Drqo4soSoYi/m3jsgYLje3R8tPf6NqZJeeqonn0LmfVklM2E6UIaqebDnAkvr5CAiHaIXz/yL7KADtvAUHM2gjUi/LgtvASEZYtOn2IotMJtLqTIcNLRqP/xlhWhhYcyLtHKCKjzLPDU5pQUSlJAxx3P0+pGL/JPxloOooibeimNpa+EmWn4sVV4Bdz6fI8HC38x9RL3LUKWg7nCErAakQ7DX8V+o7GZelgwILPSgXZ4yw3YjHVPv4+2ALkhhL6NKD4NZ1Bn+ZYaUd/YttbuPsGnIpdTMebhRJv2Vytzxdkwm3I9CqrwqhEs33YbjqQpQz65C4Sd2mNsBpS7qUpydpxfFbongsIzVK86LeBIW1a3t1PCin2ct12cfJVTpm9Cz/hd3WJ+ikElWvZU2wW4BrMQWaOBwKbNOv9oYP/SeI8EZUUWvsybU51BV4a3Q0DZ3n1Ms5pjDuPGzRillvuY6uvHGzZ6UMwzN4HzV7JDwhJCth2KqlmMsRiEVrhYbve4u9yplHZRV48HCThhI32Y14ZGmxZVhqqCQj+l8C1XSGE++TB0S8n7yN/H+t21yPJvxzwvYDxd+DRUUQ8EzEe1kFmj3rENCGFrMULUcHKiwCiZUKiTUfY7ggxQDqQb5aMA1JAXoQ7n3EFPFELLrv4WqzgzNKFlLl0NrAVqJpf7SJFPJ1+L0MdOd+/O7imLu4opPhhhVsgqIxRGbydiUY2OBNcNuzALDgr4meen2wZzjI4MRLyq5IjsSUQVNwiu/h6oRmvRCOt1M2gQShk76ZDcNqAI+xzMVgqHW6VTnDdJpjT+5lhOoylii2Em0jweSCvJEH5X25g8NvQv/HZip1X7RyK7K43uo6vQDfZ19SxXUsOqb7GrlSCXH3k/z8oYL0p7iTcicKYdwewxVULAiFUAKpkcwUYpexL7hjVS8Cx7vVaUcn54qA7vLUxNwxSN7KzlkfxtQxWw8aX0HfSGodfRuw8xBZtqYKghofqFFRWcQvYcsfW78HRCExM6DwUt6Ocg4PVWd92CvE9aJPVhH1m46eN6EKtPT8beBY0rud6Q/DfNxm1MFGGuRVGLnwY7Kv0okdLbBMxBPztt8/4n4AVQtKaRBJNTamRz8JKQmWgOqAq87Mmzoa71jq1UPNKEKskwEvFzhcJ/evgbBVGPHNwMCbqZB6iKN/RpoWnJ9Qo3poTs9VZ1DUFJNxJ/QKPPr1KMNqAp0f2xXqlpHs5rtgKVUwcnidhoCvxg4mW6+Y2WRJwJZHRxORkZeDfmKVGVq6H4AVXNkvz9Ha0hHq0BNm48NqGIWnrTGUVl13hntmu2ApVSxYy06ESdd3eEnniRC0XKEVCEFtcCWSw7dD6BKQR4dOdrsXRWNd1rQNqCK82yWrYn+n/X6tm+mA5ZSlfZWuLhRmf2rBlX0BO+Zv4mqzoBLNUJCmno2o64BVbKnXM3DTU/2xCEhLlOCBlTpO+SogGYqyIU3QFqVC/DADEM7G2+AlfmDP4IqDbnI7/EYoIBXztfWgKqe92gUKvX+oR0aHR9hyKeaiT5ADcfp2ctkT5FaQS/sq0JoYdlrpFZU3sr1I6hS1khfxQk4T4Gln6t4XZ+qe6/4a1hcXXWUJop+hbciO4XmODbN3SZ/DOaJ8FQ1/D5efo+y7sHGPttAOCFPRf5gcX0fIJx4xZ/C4IcfDmnilCpUnAs867dYEDIJK3CJoopFWRopIK2KlD+Yxs+gSsRZxIFRiHQAZpqt1q3tWQfPnQRV/ptcQli/GA9kxbmAKv2A5gFI+JZ1JByZOufTsWPp/uc7ltAL0IZxrvj+8IC2vEtsWTtehaiKksU8qrYNiKKgWhYEycercLw3pbKiThSF/lOQ0ONEDlJD9zOoQsIZ+cN5NEVz1Wq1qQpefxPFkKZRlnJNqsyGoUUXa4GJ8MA88GpBRiO+KQ2kAEO5Il24kirmPfeHL6AKO8L8jFn0f6SzM7XvVQqynKI9z6dKrAgFp1CUk1QcBQ4P6KlRDEpCja04s4+A5xF9KE9pr15VuXxKCU2iz6VqhjKnnJFeLGSv6y6rQM7Z2ASm+Jdok6kH4YmsjBVTJVrIGICqFv6E/OWUXOMMj4KUHkjnbmYlBOyJVO2D6oGV0cQUF91SUZMqLf104fECFF/rXd0EryKqyy91L5YLXIBaGFEM7rm6bEAVX+A5LUmDsZkw2Skc7RHKRIBU/hsJor1PJ/aG0TliGkxkGpdQtcQHBNIKv7jB1+ZUUfWMkgvmnRQKqdoGf2AXgQMUTEiCfdmtOdaBWtFxMDu+PdyIKqrAcVBClTTASgyI5hjOXAXUbab8aizIdDqVJUwuYw6VyWVEqnDMD1IvMVfSahxaKFVUIf0bjVqMQqp0tKzQFi+8k7Yg5aERVUha42OIDagqPM5blgco4nEBdKToD8JrLsxBLAWUrQNp/8e0DrELbbPKlE0iVQpO9YGss8WpcjeXlKdVg1pUIQ8Exd/6CrgRJV4XUSUN4jRnaBLv5pP+1BRWSH1UgmMOUA6MtQZUMX9JlXeqsmtxzIWNAwRhsjzgu85gL4ra6uWCk9GMzOavXWOuKhOhyTr9HKfDQ1btmcPhM9/z83og5UzqUGXjjVLgnoe9Ho8Hv/gonBEHldiCNKt93SvL5KD4SgUUxDffNaCKYJ4glOes7/F204tIUDbhB4Agy6u9Xk8VsCsS8tlQvngeX3hSdbyAAOU5dnICEB7R4h63Vh1lXYxMGRBcFojaVkyV8h5pDUzBYNW2jnpB9yTXvL8ba8Gj9amCUCPXjp2QRdcGStjBlFCkpNWEqAkBOSu//I/aka4SIh7aIQHFzVNgGDe0q4oO7WAkD+5SkffhLNgUiPVtQyKgWmBg6HVDhPd4ZotLfAxfr38xHftMrtxTa/xFAgsj6wrtLwzBSa4X4z8581FBCGjOIh6Gs2k+4zpLH4XLnTdLYc6n7iGCtHzQfBHK+3wnMveC3NTwKFwI7S3BFbxDPdD8+kCPJIv08HhNwcTxsBfqLavcwXqtvgmsFoyFB3cicCbpgBGCeE1x7CEjhLbTIeBpENwA5ac1MZe7VYGppbjjigOm6VOcaRgLCueOetUIkzHSRowDkzlg6ppc/iyquKCDKQUhLZgvuLjtFNbnot0il2kbIzRAqsDsMg/adYlKJijnMcscTs5gtH3c5wWZttqMnYl5L5uT58WmX+Y+qji2nT0bnXl4+36w2O7DveksXqOj2to8e2zbfiSc8Fbmf4d8t8uZ49e4Cq++Jbk+HTtjroubUzNmBS4zr5jX9qwLt+SaPwJJ1Iyzq9mZoVXdcNDgMgQCFNGrxntWO+ZuVl3z6p2d1awWZnIs8lgW3iOXXhpmxsXyVPsG/SqnaQsfyyCllj2UxeOqjnVgMOm7RcTaAXviWdcWGeDTNfxjWaGaziXWV39ikI4nEwHN9oN+NbC0UEp++Q5Uz70OmaRKjc+V1ABz3i6qauDxZM7L5ZpRz2PBJvNda0ercjKuBQka8g4XXpuDIW3qpV/y8cEbqfbn4/hcQkeLPJQ1CtRXhk1r2lZQjo4e7nvVxdEzH7qq/1+B7uJs6GJfQYh+vd0MCnt0//OccDsNGfIvuM/5pNBs297vcHBpUi3WpXFNO9i83Wra9rZ2Bgy/+323Ln4rto5pmgIe/eIrLhMQa36/ANLQNGHt7EG27OLuFt6aYhO3sPGV2cABVrW/Xdrg43GQ+je+NXY83PhEIRRqfkxZapbXXA/qL7wf+HthhwkTkJZf68qK0Sd9vTkB5rllqgIjRwXQvzNNvp7VHyzx7ZPXFT35FV8KOy3EF0Azzh+3mdNfu/zUj/ixv/JbHr8Es8/8NCZrtV7aL8T287gCfOv6+1LY5iftgTTdMvXF0JymlyeRAOlWTn09tEVt914xklcjtfgyjJ6O/kZmiF7FR5NafBIkV21y92YWkO7OW8v3u2AM6SbncVIAdDbBssVXQhmQvuZQZ0kJ1GMb9fhWSLNd74iFBdRdq6N/O3SbVhtdwk5BoJrbNjnpFFDcIV07iOVpE6xFvpunxTdAdxdUPc0d8nDRb4XUKaHbm4lc5WuCtGptyr+i1+IboIjbC1lmyKc+/C8JCfLdxVZsZdSPgKTYU8tbOwxDswBnVgDA+v8GlHVrEz7v1+KEEJeD978LZ3iJLoQZDt/Gf5/crXbqdrUgQvLPlNkBDOOos2EtWrRo0aJFixYtWrSogf8BTBi6j2qmy40AAAAASUVORK5CYII=" alt="Your Logo" class="logo">
    <button class="candidatelist-button" on:click={candidatelist}>Candidates</button>
    <button class="joblist-button" on:click={joblist}>Jobs</button>
    <button class="logout-button" on:click={handleLogout}>Logout</button>

        
        {#if isPopupVisible}
        <div class="popup">
          <h1 class="popup-title">HireOptica</h1>
          <a class="popup-link" href="/business" on:click={openBusinessProfile}>Business Profile</a>
          <a class="popup-link" href="#" on:click={handleLogout}>Logout</a>
          <a class="popup-link" href="#" on:click={togglePopup}>Close</a>
        </div>
        <div class="popup-overlay" on:click={togglePopup}></div>
        {/if}
      </div>
   
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
 

 <style>
   .h2 {
     margin-left: 650px;
     margin-top: 90px;
     font-weight: bold;
     font-size: 20px;  
   }
 
  .add-button {
    top: 0;
    right: 0;
    margin-left :1385px;
    margin-top: 0px;
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

.header {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 20px;
  }

  .logo {
    width: 100px;
    height: 30px; 
  }

  .header button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin: 0 10px; /* Adjust the margins */
  }

  .header button:hover {
    text-decoration: underline;
  }

  .user-actions {
    display: flex;
    align-items: center;
  }

  .logout-button {
    background-color: red;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    color: white;
  }

  .user-profile img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 1100px;
    justify-content: center;
  }

  .popup {
    position: absolute;
    top: 60px;
    left: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 999;
    width: 150px;
  }

  .popup-title {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
    text-align: center;
    color: darkred;
  }

  .popup-link {
    display: block;
    padding: 8px 0;
    text-decoration: none;
    color: black;
    text-align: center;
  }

  .popup-link:hover {
    background-color: #f0f0f0;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 998;
  }

 </style>