<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/post.svelte';

	let { data }: { data: PageData } = $props();

	const posts = $derived(data.feed);

	$inspect(posts);
</script>

{#each posts as post}
	<Post post={post.post} />
{/each}
