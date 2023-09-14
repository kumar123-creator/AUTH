<script>
  import { Input, Label } from 'flowbite-svelte';
  import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.js';
  import { goto } from '$app/navigation';
  import { getDatabase, ref, set } from 'firebase/database'; 

  let email = "";
  let password = "";
  let fullName = "";
  let errorMessage = "";
  let showPassword = false; // Track whether to show the password

  async function handleSubmit() {
    try {
      // Check if the email is already in use
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        // Email is already in use
        errorMessage = "Email is already in use. Please use a different email.";
        return;
      }
      if (password.length < 6) {
        errorMessage = "Password must be at least 6 characters long.";
        return;
      }

      // If the email is not in use and password is valid, proceed with creating the account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the registered email and password for display
      const registeredEmail = user.email;
      const registeredPassword = password;

      // Save user registration data to Firebase Realtime Database
      const db = getDatabase(); // Initialize the database
      const usersRef = ref(db, 'users'); // Reference to a "users" node in the database

      // Create a new user object with the registration data
      const newUser = {
        email: registeredEmail,
        password: registeredPassword,
        fullName,
       
      };

      // Set the data in the database
      set(usersRef, newUser);

      goto('/information', {
        state: {
          registeredEmail,
          registeredPassword,
        },
      });

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

<div class="signup-container">
  <h1 class="signup-title">Sign Up</h1>
  <form on:submit={handleSubmit} class="signup-form">
    <div class="form-group">
      <Label for="firstname" class="form-label"> Name:</Label>
      <Input type="text" bind:value={fullName} required id="firstname" placeholder="Full Name" class="form-input" />
    </div>
    
    <div class="form-group">
      <Label for="email" class="form-label">Email:</Label>
      <Input type="email" bind:value={email} required id="email" placeholder="Enter Email" class="form-input" />
    </div>
    <div class="form-group">
      <Label for="password" class="form-label">Password:</Label>
      <Input
        type={showPassword ? "text" : "password"} 
        bind:value={password}
        required
        id="password"
        placeholder="Password should be at least 6 characters"
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
    {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
    {/if}
    <div class="form-group">
      <button type="button" on:click={handleclick}>Sign Up</button>
    </div>
  </form>
  <div class="login-link">
    <p>Already Registered?<a href="/">Login page</a>.</p>
  </div>
</div>

<style>
  .signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
  }

  .signup-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .signup-description {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 20px;
  }

  .signup-form {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    font-weight: bold;
  }

  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  .password-toggle {
    display: flex;
    align-items: center;
  }

  .error-message {
    color: red;
  }

  .login-link {
    text-align: center;
    margin-top: 20px;
  }

  .login-link a {
    color: blue;
    font-weight: bold;
  }

  button {
    background-color: blue;
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
  }

  button:hover {
    background-color: #04995d;
  }
</style>
