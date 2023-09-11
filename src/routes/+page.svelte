<script>
  import { auth } from '$lib/firebase/firebase.js';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { Input, Label } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

   export let email = "";
   export let password = "";
   export let errorMessage = ""; 

  async function handleSubmit() {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      

      errorMessage = "";
    
      // Navigate to the /information route after successful login
      goto('/information');
    } catch (error) {
      // Display error message if login fails
      errorMessage = "Invalid username or password.";
      console.error("Error logging in:", error.message);
    }
  }

  const handleclick = () => {
    // Only allow clicking when there are no errors
    if (!errorMessage) {
      handleSubmit();
    }
  }
</script>


<form on:submit={handleSubmit} class="form">
  <div class="mb-6">
    <Label for="email" class="form-label">Email:</Label>
    <Input type="email" bind:value={email} required id="email" class="form-input" />
  </div>
  <div class="mb-6">
    <Label for="password" class="form-label">Password:</Label>
    <Input type="password" bind:value={password} required id="password" class="form-input" />
  </div>
  <div>
    
    <button style="color: blue;" on:click={handleclick} >Login</button>
  </div>
 
</form>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{/if}

<p>Please create an account after click on Register , if you don't have.</p>
<a href="/register" style="color: blue;">Register</a>


