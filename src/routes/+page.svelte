<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/post.svelte';

	let { data: page }: { data: PageData } = $props();
</script>

{#each page.data as post (post.post.uri)}
	<Post {post} />
{/each}
