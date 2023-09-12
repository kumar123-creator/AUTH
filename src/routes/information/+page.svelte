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

<h1 style="color: {isBlue ? 'blue' : 'green'};" class="h1">Welcome</h1>

<style>
  .h1 {
    margin-left: 600px;
    margin-top: 195px;
    font-weight: bold;
    font-size: 70px;
  }
</style>
