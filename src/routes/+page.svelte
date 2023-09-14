<script>
  import { auth } from '$lib/firebase/firebase.js';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { Input, Label } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  export let email = "";
  export let password = "";
  export let errorMessage = "";
  let showPassword = false; // Track whether to show the password

  async function handleSubmit() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      errorMessage = "";
      // Navigate to the /Welcomepage route after successful login
      goto('/Home Page');
    } catch (error) {
      // Display error message if login fails
      errorMessage = "Invalid username or password.";
      console.error("Error logging in:", error.message);
    }
  }

  const togglePasswordVisibility = () => {
    // Toggle the password visibility
    showPassword = !showPassword;
  }
</script>

<div class="login-container">
  <h1 class="login-title">Login</h1>
  <form on:submit={handleSubmit} class="login-form">
    <div class="imgcontainer">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg" alt="Avatar" class="avatar">
    </div>
  
    <div class="form-group">
      <Label for="email" class="form-label">Email:</Label>
      <Input type="email" bind:value={email} required id="email" class="form-input" placeholder="Enter Email" />
    </div>

    <div class="form-group">
      <Label for="password" class="form-label">Password:</Label>
      <Input
        type={showPassword ? "text" : "password"}
        bind:value={password}
        required
        id="password"
        placeholder="Enter Password"
        class="form-input"
      />
    </div>

    <div class="form-group">
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
      <button type="button" on:click={handleSubmit}>Login</button>
    </div>
  </form>

  <div class="register-link">
    <p>Don't have an account? <a href="/register">Register here</a></p>
  </div>
</div>

<style>
  .imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
  }

  .login-title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
    color: dark;
  }

  .login-form {
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

  .register-link {
    text-align: center;
    margin-top: 20px;
  }

  .register-link a {
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
    background-color: darkblue;
  }
</style>
