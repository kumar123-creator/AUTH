

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
    if (!errorMessage) {
      handleSubmit();
    }
  }
  
</script>


<form on:submit={handleSubmit} class="form" >
  <div class="mb-6">
    <Label for="firstname" class="form-label">Firstname:</Label>
    <Input type="text" bind:value={firstName} required id="email" class="form-input"  />
  </div>
  <div class="mb-6">
    <Label for="lastName" class="form-label">Lastname:</Label>
    <Input type="text" bind:value={lastName} required id="lastName" class="form-input"  />
  </div>
  <div class="mb-6">
    <Label for="email" class="form-label">Email:</Label>
    <Input type="email" bind:value={email} required id="email" class="form-input" />
  </div>
  <div class="mb-6">
    <Label for="password" class="form-label">Password:</Label>
    <Input type="password" bind:value={password} required id="password" class="form-input" />
  </div>
  <div>
    <button style="color: blue;"  on:click={handleclick}  >Signup</button>
  </div>
</form>
