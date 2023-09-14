<script>
  import { onMount } from 'svelte';

  let isBlue = true; // Start with blue color

  onMount(() => {
    // Create an interval to toggle the color every 2 seconds
    const interval = setInterval(() => {
      isBlue = !isBlue;
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  });
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Make the container full height of the viewport */
  }

  .h2 {
    font-weight: bold;
    font-size: 30px;
  }

  .h1 {
    font-weight: normal;
    font-size: 20px;
  }
</style>

<div class="container">
  <h1 class="h1" style="color: darkgreen;">Successfully signed in into Your account.</h1>
  <a href="/" style="color: blue; font-weight: bold; font-size: 30px;" class="h2">Login</a>
</div>
