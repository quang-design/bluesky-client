<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/post.svelte';

	let { data }: { data: PageData } = $props();

	const posts = $derived(data.feed);

	// $inspect(posts);
</script>

<section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each posts as post}
		<Post post={post.post} />
	{/each}
</section>
