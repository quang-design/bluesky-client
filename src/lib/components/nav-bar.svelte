<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Search } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { X } from '@lucide/svelte';

	let searchTerm = $state('');
</script>

<header class="sticky top-0 z-50 w-full bg-background">
	<div class="container-wrapper 3xl:fixed:px-0 border-b border-gray-100 px-4 py-2">
		<div
			class="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4"
		>
			<Button href="/" variant="ghost" class="p-0 text-lg font-semibold hover:bg-transparent"
				>Bluesky Client</Button
			>

			<div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
				<div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
					{@render SearchBar()}
				</div>
				<div class="flex items-center gap-2 md:hidden">
					<Dialog.Root>
						<Dialog.Trigger>
							<Button variant="outline" size="icon">
								<Search />
							</Button>
						</Dialog.Trigger>
						<Dialog.Content
							showCloseButton={false}
							class="gap-2 rounded-xl border-white/25 bg-white/25 p-2 pb-2 backdrop-blur-lg"
						>
							<Dialog.Title class="ml-0.5 flex items-center text-sm text-white">
								<p class="text-base font-normal">What are you looking for?</p>
								<Dialog.Close class="mr-1 ml-auto"><X size={16} /></Dialog.Close>
							</Dialog.Title>
							{@render SearchBar()}
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
		</div>
	</div>
</header>

{#snippet SearchBar()}
	<Button variant="outline" size="sm" class="w-full">
		<Search />
		<input
			type="search"
			placeholder="Search"
			class="w-full text-base focus:outline-none"
			bind:value={searchTerm}
		/>
	</Button>
{/snippet}
