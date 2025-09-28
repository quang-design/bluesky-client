<script lang="ts">
	import type { AppBskyFeedDefs } from '@atproto/api';
	import Author from '$lib/components/author.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	interface CommentProps {
		reply: AppBskyFeedDefs.ThreadViewPost;
	}

	const { reply }: CommentProps = $props();
	const post = $derived(reply.post);

	// $inspect(reply);
</script>

<Card.Root class="mb-4 w-full shadow-md sm:-mb-4 sm:max-w-sm">
	<Card.Header>
		<div class="flex max-w-full gap-2 truncate">
			<Author author={post.author} />
		</div>
		<p class="mb-2 break-words">{post.record.text}</p>
	</Card.Header>
	<Card.Content></Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
