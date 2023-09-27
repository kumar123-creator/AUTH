<script>
    import { onMount } from 'svelte';
    import { auth } from '$lib/firebase/firebase.js';
    import { goto } from '$app/navigation';
    import { Input, Label, Select } from "flowbite-svelte";
    import 'flowbite/dist/flowbite.css';
    import { MultiSelect } from 'flowbite-svelte';
    import intlTelInput from "intl-tel-input";
    import "intl-tel-input/build/css/intlTelInput.css";
  
    let id = "";
      let name = "";
      let address = {
          addressLine: "",
          cityName: "",
          regionName: "",
          postCode: "",
          countryCode: "",
          latitude: "",
          longitude: "",
      };
      let phone = '';
      let website = "";
      let currencyCode = "gb";
      let preferredDateformat = "";
      let timeZone = "";
      let mobilePreferences = {
          preferredCountryCode: "",
          preferredCountries: "",
      };
      /**
     * @type {any[]}
     */
      let currencyOptions = [];
      let selectedTimezone;
      let reactiveTimezoneOptions = [];
      let imageUrl = null;
      let dataFetched = false;
      let countryOptions = '';
      let preferredCountryCode = [];
      let preferredCountryCode1 = [];
      let selectedLabels = [];
      let countries = [];
      let iti;
      let preferredCountries1 = [];
      let selectedCodes = [];
      let preferredCountries = [];
  
      async function fetchData() {
          try {
              const response = await fetch("https://api.recruitly.io/api/business/profile?apiKey=TEST45684CB2A93F41FC40869DC739BD4D126D77");
              const data = await response.json();
              console.log(data);
  
              // Populate the form fields with the fetched data
              id = data.id;
              name = data.name;
              address = {
                  addressLine: data.address.addressLine,
                  cityName: data.address.cityName,
                  regionName: data.address.regionName,
                  postCode: data.address.postCode,
                  countryCode: data.address.countryCode,
                  latitude: data.address.latitude,
                  longitude: data.address.longitude,
              };
  
              console.log(phone);
              website = data.website;
              currencyCode = data.currencyCode.code;
              console.log(currencyCode);
              preferredDateformat = data.preferredDateFormat;
              timeZone = data.timeZone;
              console.log(timeZone);
              preferredCountryCode = data.mobilePreferences.preferredCountryCode,
              preferredCountries = data.mobilePreferences.preferredCountries;
              selectedLabels = preferredCountries.split(",");
  
              preferredCountries1 = preferredCountries.toUpperCase();
              preferredCountryCode1 = preferredCountryCode.toUpperCase();
              console.log(preferredCountries1);
              dataFetched = true;
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };
      
       async function fetchCurrencyAndTimezones() {
try {
    const currencyResponse = await fetch('https://api.recruitly.io/api/lookup/currency?apiKey=TEST27306FA00E70A0F94569923CD689CA9BE6CA');
    const currencyData = await currencyResponse.json();

    if (Array.isArray(currencyData.data)) {
        currencyOptions = currencyData.data.map((currency) => ({
            value: currency.code,
            label: currency.name,
        }));
        console.log('Currency Options:', currencyOptions);
    } else {
        console.error('Invalid currency data format:', currencyData);
    }

    const timezoneResponse = await fetch('https://api.recruitly.io/api/lookup/timezone?apiKey=TEST27306FA00E70A0F94569923CD689CA9BE6CA');
    const timezoneData = await timezoneResponse.json();

    if (Array.isArray(timezoneData.data)) {
        reactiveTimezoneOptions = timezoneData.data.map((timezone, index) => ({
            ...timezone,
            id: index + 1,
        }));
        selectedTimezone = reactiveTimezoneOptions.length > 0 ? reactiveTimezoneOptions[0].code : null;
        console.log('Timezone Options:', reactiveTimezoneOptions);
    } else {
        console.error('Invalid timezone data format:', timezoneData);
    }
} catch (error) {
    console.error('Error fetching options:', error);
}
};
  

 async function fetchCountryData() {
try {
    const response = await fetch(
        "https://api.recruitly.io/api/lookup/countries?apiKey=TEST69513C4B379BD5594CD0AAC9ECA436CA2C83"
    );
    const responseData = await response.json();
    if (Array.isArray(responseData.data)) {
        countryOptions = responseData.data.map((country) => ({
            value: country.code,
            label: country.name,
        }));
        console.log("Country API response:", responseData);
    } else {
        console.error("Invalid country data format:", responseData);
    }
} catch (error) {
    console.error("Error fetching country options:", error);
}
};

 async function fetchCountries() {
try {
    const response = await fetch(
        "https://api.recruitly.io/api/lookup/countries?apiKey=TEST69513C4B379BD5594CD0AAC9ECA436CA2C83"
    );
    const responseData = await response.json();
    if (Array.isArray(responseData.data)) {
        countries = responseData.data.map((country) => ({
            name: country.name,
            value: country.code.toLowerCase(),
        }));
        selectedCodes = countries
            .filter((country) => selectedLabels.includes(country.value))
            .map((selectedCountry) => selectedCountry.value);
    } else {
        console.error("Invalid API response format:", responseData);
    }
} catch (error) {
    console.error("Error fetching data:", error);
}
};

    onMount(async () => {
      await fetchData();
      fetchCurrencyAndTimezones();
      fetchImage();
      fetchCountryData();
      fetchCountries();
  
      
  
      const inputElement = document.querySelector('#phone-input');
          iti = intlTelInput(inputElement, {
              utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@16.0.3/build/js/utils.js',
              separateDialCode: true,
          });
  
          iti.setNumber(phone);
          iti.setPlaceholderNumberType('FIXED_LINE');
  
          inputElement.addEventListener('countrychange', handleCountryChange);
          inputElement.addEventListener('input', handleInput);
    });
  
    const handleCountryChange = () => {
          phone = iti.getNumber(intlTelInputUtils.numberFormat.E164);
      };
  
      const handleInput = () => {
          phone = iti.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL);
      };
  
      const handleLogoClick = () => {
          const inputElement = document.createElement("input");
          inputElement.type = "file";
          inputElement.accept = "image/*";
          inputElement.addEventListener("change", uploadImage);
          inputElement.click();
      };
  
      const uploadImage = async (event) => {
          const apiKey = "TEST45684CB2A93F41FC40869DC739BD4D126D77";
          const uploadUrl = `https://api.recruitly.io/api/image/upload?apiKey=${apiKey}`;
          const formData = new FormData();
          formData.append("file", event.target.files[0]);
          formData.append("profilePic", "true");
          formData.append("type", "TENANT");
          try {
              const response = await fetch(uploadUrl, {
                  method: "POST",
                  headers: {
                      Cookie: "SESSION=NDU1ZDRjNmUtNDg1ZC00NjVhLWJhNmItN2NlZmE4NzYxMWRm",
                      "Cache-Control": "no-cache, no-store, must-revalidate",
                  },
                  body: formData,
              });
              const data = await response.json();
              imageUrl = data.logo.url;
          } catch (error) {
              console.error("Error uploading image:", error);
          }
      };
      async function saveFormData() {
          const Update = {    
              id,
              name,
              address: {
                  addressLine: address.addressLine,
                  cityName: address.cityName,
                  regionName: address.regionName,
                  postCode: address.postCode,
                  countryCode: address.countryCode,
                  latitude: address.latitude,
                  longitude: address.longitude,
              },
              phone,
              website,
              currencyCode: { code: currencyCode },
              preferredDateformat,
              timeZone,
              preferredCountries: selectedLabels,
              preferredCountryCode: preferredCountryCode1.toLowerCase(),
          };
  
          try {
              const response = await fetch('https://api.recruitly.io/api/business/profile/save?apiKey=TEST45684CB2A93F41FC40869DC739BD4D126D77', {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(Update),
              });
              const updatedData = await response.json();
              console.log("Updated data from API:", updatedData);
              alert("Business Profile Updated successfully");
          } catch (error) {
              console.error("Error updating data:", error);
          }
      };
  
      const handleSelection = (event) => {
          if (event && event.detail && event.detail.value) {
              selectedCodes = event.detail.value.map((selectedCountry) =>
                  selectedCountry.value.toLowerCase()
              );
          }
      };
  
     async function fetchImage() {
      const apiKey = "TEST45684CB2A93F41FC40869DC739BD4D126D77";
      const uniqueParam = Date.now();
      const apiUrl = `https://api.recruitly.io/api/business/profile?apiKey=${apiKey}&timestamp=${uniqueParam}`;
      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          imageUrl = data.logo.url;
      } catch (error) {
          console.error("Error fetching image:", error);
      }
  };
  
  let isBlue = true; 

onMount(() => {
  // Create an interval to toggle the color every 2 seconds
  const interval = setInterval(() => {
    isBlue = !isBlue;
  }, 1000);

  // Clean up the interval when the component is unmounted
  return () => clearInterval(interval);
});

let isAuthenticated = false; // Initialize a loading state

//  if the user is authenticated when the component mounts
onMount(async () => {
  // Check if the user is authenticated
if (auth.currentUser) {
  isAuthenticated = true; // User is authenticated
} else {
  // If the user is not authenticated, redirect them to the login page
  goto('/'); 
}
});

 let isPopupVisible = false;
 

function handleLogout() {
 try {
// Remove user data from localStorage
localStorage.removeItem('user');
// Redirect to the login page
goto('/');
} catch (error) {
console.error("Error logging out:", error.message);
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
<main>
<div class="header">
    <div class="user-actions">
      <div class="user-profile" >
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxByYdlAK5e7HyVnE_QyJ5RBP2Y8vlxuGjA&usqp=CAU" alt="User Profile" on:click={togglePopup} style="margin-left:0px;" >
  </div>
</div>
    <img src="data:image/png;base64,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" alt="Your Logo" class="logo">
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
</main>
  <style>
    .container {
        max-width: 600px;
        margin: 0 auto;
    }
  
    .form-container {
        margin-top: 2rem;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 1.25rem;
    }
  
    .form-container h2 {
        text-align: center;
        font-weight: bold;
        margin-bottom: 1rem;
        font-size: x-large;
        color:blue;
    }
  
    .logo {
    cursor: pointer;
    max-width: 100%;
    height: auto;
  }
  
  .logo-container {
    cursor: pointer;
    max-width: 100%;
    height: auto;
  
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
  {#if isAuthenticated}
  <main class="container">
    <form class="form-container">
    <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
            <h2>BUSINESS PROFILE</h2>
            <hr>
        </div>
    </div>
    <div class="mb-6 logo-container">
    <Label for="company_logo" class="mb-2">Company Logo</Label>
    <img id="uploadedImage" src="{imageUrl}" alt="Logo" on:click={handleLogoClick} style="cursor: pointer; max-width: 100px;" />
    
    </div>
    <div class="mb-6">
    <Label for="company_name" class="mb-2">Company Name</Label>
    <Input type="text" id="name" bind:value={name} required />
    
    </div>
    <div class="mb-6">
    <Label for="address" class="mb-2">Address</Label>
    <Input type="text" id="address" bind:value={address.cityName} required />
    </div>
    
    
    <div>
    <div class="mb-6">
    <label for="phone" class="mb-2" >Phone</label>
    <input type="tel" id="phone-input" on:input={handleInput}  class="form-select  block w-full py-2.5 pl-3 pr-10 text-base border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-600" style="width:500px;" />
      </div>
    </div>
    
    <div class="mb-6">
    <Label for="website" class="mb-2">Website</Label>
    <Input type="url" id="website" bind:value={website} required />
    </div>
    
    <div class="mb-6">
    <label for="currency" class="block text-sm font-medium text-gray-700 dark:text-white">Currency:</label>
    <div class="relative mt-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
    <select id="currency" bind:value={currencyCode} required class="block w-full py-2.5 pl-3 pr-10 text-base border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-600">
                {#each currencyOptions as currency}
    <option value={currency.value}>{currency.label}</option>
                {/each}
    </select>
    </div>
    </div>
    
    <div class="mb-6">
        <label for="timezone" class="block text-sm font-medium text-gray-700 dark:text-white">Timezone</label>
        <div class="relative mt-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
        <select id="timezone" bind:value={timeZone} required class="block w-full py-2.5 pl-3 pr-10 text-base border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-600">
                    {#each reactiveTimezoneOptions as timezone }
        <option value={timezone.code}>{timezone.name}</option>
                    {/each}
        </select>
        </div>
        </div>
  
    
    <label for="preferredDateFormat" class="block text-sm font-medium text-gray-700 dark:text-white">Preferred Date Format</label>
    <div class="relative mt-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
    <select id="preferredDateFormat" bind:value={preferredDateformat} required class="block w-full py-2.5 pl-3 pr-10 text-base border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-600">
    <option value="default" >Pretty (e.g., 1 Day Ago/2 Week Ago, etc.)</option>
    <option >Date only (e.g., 12/31/2020)</option>
    <option >Date and Time (e.g., 12/31/2020 15:00:00)</option>
    <option >Date and Time (e.g., 12/31/2020 03:00PM)</option>
    </select>
    </div>
    
     
    <div class="mb-3">
        <Label for="country" class="mb-2">Default Country To Display</Label>
        <Select class="block w-full rounded-lg bg-white border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500" bind:value={preferredCountryCode1} on:change={(event) => {
                preferredCountryCode1 = event.target.value.toUpperCase();}}>
                {#each countryOptions as country1}
                <option value={country1.value}>{country1.label}</option> 
                 {/each}
        </Select>
        </div>
    
         <div class="mb-3">
         <Label class="mb-2">Preferred Countries To Display on Top</Label>
         {#if countries.length > 0}
         <MultiSelect items={countries} bind:value={selectedLabels} on:change={handleSelection} />
         {/if}
        </div>
    
     <div class="mb-6">
    <button type="button" on:click={saveFormData} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">update profile</button>
    </div>
    </form>
    </main>
    {/if}