<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/post.svelte';

	let { data }: { data: PageData } = $props();

	let innerWidth = $state(0);

	const posts = $derived(data.feed);

	const CARD_MAX_WIDTH = 384;
	const CONTAINER_PADDING = 16;

	let leftOffsets = $state<number[]>([]);

	$effect(() => {
		if (innerWidth < 640) {
			leftOffsets = posts.map(() => 0);
			return;
		}
		const maxOffset = Math.max(0, innerWidth - CONTAINER_PADDING - CARD_MAX_WIDTH);
		leftOffsets = posts.map(() => Math.floor(Math.random() * (maxOffset + 1)));
	});

	// $inspect(posts);
	$inspect(innerWidth);
</script>

<svelte:window bind:innerWidth />

<section class="relative flex w-full flex-col items-center sm:items-start">
	{#each posts as post, i}
		<div class="w-full self-start" style:margin-left={`${leftOffsets[i] ?? 0}px`}>
			<Post post={post.post} index={i} />
		</div>
	{/each}
</section>
