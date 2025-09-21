<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/post.svelte';

	let { data }: { data: PageData } = $props();

	let containerWidth = $state(0);

	const posts = $derived(data.feed);

	const CARD_MAX_WIDTH = 384;

	let leftOffsets = $state<number[]>([]);

	$effect(() => {
		if (containerWidth < 640) {
			leftOffsets = posts.map(() => 0);
			return;
		}
		const maxOffset = Math.max(0, containerWidth - CARD_MAX_WIDTH);
		leftOffsets = posts.map(() => Math.floor(Math.random() * (maxOffset + 1)));
	});

	// $inspect(posts);
	// $inspect(containerWidth);
</script>

<section
	class="relative flex w-full min-w-0 flex-col items-center sm:items-start"
	bind:clientWidth={containerWidth}
>
	{#each posts as post, i}
		<div class="w-full max-w-full self-start" style:margin-left={`${leftOffsets[i] ?? 0}px`}>
			<Post post={post.post} index={i} />
		</div>
	{/each}
</section>
