<script lang="ts">
	import type { PageProps } from './$types';
	import Post from '$lib/components/post.svelte';
	import Comment from '$lib/components/comment.svelte';

	let { data }: PageProps = $props();

	const { post, replies } = $derived(data);

	// $inspect(post);
	// $inspect(replies);
</script>

<div class="container mx-auto items-center">
	<Post {post} />
	{#each replies as reply}
		<Comment {reply} />
	{/each}
</div>
