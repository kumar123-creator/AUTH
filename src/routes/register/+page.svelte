

<script>
  import { auth } from '$lib/firebase/firebase.js';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { Input, Label, Helper } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
 
 

  let email = "";
  let password = "";
  let firstName = "";
  let lastName = "";
 let errorMessage = ""; 
 let showPassword = false; // Track whether to show the password

  async function handleSubmit() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      goto('/information');
      alert("signed up successfully!")
    
     
      console.log("User signed up successfully!");
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }

  const handleclick = () => {
    // Only allow clicking when there are no errors
   
      handleSubmit();
    
  }
  const togglePasswordVisibility = () => {
    // Toggle the password visibility
    showPassword = !showPassword;
  }
</script>

<h1  style="color: blue;" class="h1" >Sign Up</h1>
<p class="p1" >Please fill in this form to create an account.</p>

<form on:submit={handleSubmit}  class="container">
  <div class="mb-6">
    <Label for="firstname" class="form-label">Firstname:</Label>
    <Input type="text" bind:value={firstName} required id="email" placeholder="FirstName" class="form-input"  />
  </div>
  <div class="mb-6">
    <Label for="lastName" class="form-label">Lastname:</Label>
    <Input type="text" bind:value={lastName} required id="lastName" placeholder="LastName" class="form-input"  />
  </div>
  <div class="mb-6">
    <Label for="email" class="form-label">Email:</Label>
    <Input type="email" bind:value={email} required id="email" placeholder="Enter Email" class="form-input" />
  </div>

  <div class="mb-6">
    <div class="password-container">
      <Label for="password" class="form-label">Password:</Label>
      <Input
        type={showPassword ? "text" : "password"} 
        bind:value={password}
        required
        id="password"
        placeholder="Enter Password"
        class="form-input"
      />
      <label class="password-toggle">
        <input
          type="checkbox"
          checked={showPassword}
          on:change={togglePasswordVisibility}
        />
        Show Password
      </label>
    </div>
  </div>
  <div>
    <button  type="button" on:click={handleclick} >Signup</button>
  </div>

  <div class="mb-6" >
    <p>If already Register go back to Login page.</p>
    <a href="/" style="color: blue;  font-weight: bold; font-size:18px; ">Login</a>
   </div>
</form>


<style>
.container {
  padding: 16px;
  width: 500px;
  height: 500px;
  background-color: rgb(238, 240, 234);
  margin-left:500px;
  margin-top: 35px;

}
.h1{
    margin-left: 500px;
    margin-top: 35px;
    font-weight: bold;
    font-size:30px;
  }
  .p1{
    margin-left: 500px;
    font-weight:500;
   
    font-size:20px;
  }


	.mb-6 {
 
   border-radius: 1.25rem; 
  }

  
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}
	
  </style>