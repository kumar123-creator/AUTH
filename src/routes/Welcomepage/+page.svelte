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
  
  
  <h1 class="h1" style="color: darkgreen;" >congratulations! you successfully login into Your account.</h1>
  <h2 style="color: {isBlue ? 'blue' : 'Orange'};" class="h2">Welcome</h2>
  
  <style>
    .h2 {
      margin-left: 600px;
      margin-top: 195px;
      font-weight: bold;
      font-size: 70px;
    }
    .h1 {
      margin-left: 10px;
      margin-top: 15px;
      font-weight:normal;
      font-size: 20px;
    }
  </style>
  