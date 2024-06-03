<script lang="ts">
	import { Button, Dialog, Drawer, DropdownMenu } from "@kayord/ui";
	let dialogOpen = false;
	let drawerOpen = false;

	const setNotification = () => {
		// new Notification("Test", { body: "this is more text", icon: "/logo.svg" });
		navigator.serviceWorker.ready.then((registration) => {
			registration.showNotification("Test", {
				body: "this is more text",
				icon: "/logo.svg",
			});
		});
	};
</script>

<div class="flex gap-8 flex-col p-6">
	<Button on:click={setNotification}>Notification Test</Button>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger><Button>Portal Test</Button></DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item on:click={() => (dialogOpen = true)}>Profile</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<Dialog.Root bind:open={dialogOpen}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
				<Dialog.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</Dialog.Description>
			</Dialog.Header>
			<Button
				on:click={() => {
					drawerOpen = true;
					dialogOpen = false;
				}}>Drawer</Button
			>
		</Dialog.Content>
	</Dialog.Root>

	<Drawer.Root bind:open={drawerOpen}>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
				<Drawer.Description>This action cannot be undone.</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
