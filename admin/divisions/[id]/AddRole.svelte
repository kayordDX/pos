<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  // Assuming your API functions are here - adjust path as necessary
  import { createRoleGetAll, createRoleDivisionCreate } from '$lib/services/api'; 

  export let showModal = false;
  export let divisionId: string; // Or number, depending on your ID type

  let roles: Array<{ roleid: string; name: string }> = [];
  let selectedRoleId: string | null = null;
  let isLoading = false;
  let errorMessage: string | null = null;

  async function fetchRoles() {
    isLoading = true;
    errorMessage = null;
    try {
      // Assuming createRoleGetAll returns a list of roles like { roleid, name }
      const response = await createRoleGetAll(); // Add any necessary params
      roles = response.data; // Adjust based on actual API response structure
      if (roles.length > 0) {
        selectedRoleId = roles[0].roleid;
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      errorMessage = 'Failed to load roles.';
    } finally {
      isLoading = false;
    }
  }

  async function handleSubmit() {
    if (!selectedRoleId || !divisionId) {
      errorMessage = 'Role and Division ID are required.';
      return;
    }
    isLoading = true;
    errorMessage = null;
    try {
      await createRoleDivisionCreate({
        divisionId: divisionId,
        roleId: selectedRoleId
      });
      // Optionally, dispatch an event or handle success (e.g., close modal, refresh data)
      dispatch('roleAdded');
      closeModal();
    } catch (error) {
      console.error('Error adding role to division:', error);
      errorMessage = 'Failed to add role.'; // Potentially use error.message
    } finally {
      isLoading = false;
    }
  }

  function closeModal() {
    showModal = false;
    // Consider dispatching an event if the parent needs to know
    // dispatch('close');
  }

  // Get divisionId from page params if not passed as a prop
  $: if (!divisionId && $page.params.id) {
    divisionId = $page.params.id;
  }

  onMount(() => {
    fetchRoles();
  });

  // Svelte 5 runes might offer createEventDispatcher, otherwise use Svelte 4's
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

</script>

{#if showModal}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <h2>Add Role to Division</h2>
      
      {#if isLoading && roles.length === 0}
        <p>Loading roles...</p>
      {:else if errorMessage && roles.length === 0}
        <p class="error-message">{errorMessage} Cannot load roles.</p>
      {:else if roles.length === 0}
        <p>No roles available to add.</p>
      {:else}
        <form on:submit|preventDefault={handleSubmit}>
          <div>
            <label for="role-select">Select Role:</label>
            <select id="role-select" bind:value={selectedRoleId} required>
              {#each roles as role}
                <option value={role.roleid}>{role.name}</option>
              {/each}
            </select>
          </div>
          
          {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
          {/if}
          
          <div class="modal-actions">
            <button type="submit" disabled={isLoading || !selectedRoleId}>
              {isLoading ? 'Adding...' : 'Add Role'}
            </button>
            <button type="button" on:click={closeModal} disabled={isLoading}>Cancel</button>
          </div>
        </form>
      {/if}
       {#if roles.length > 0 && errorMessage && !isLoading}
         <p class="error-message">{errorMessage}</p>
       {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    max-width: 500px;
  }
  .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .error-message {
    color: red;
    margin-top: 10px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
</style>
