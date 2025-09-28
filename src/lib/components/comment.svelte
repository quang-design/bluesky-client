<script lang="ts">
	import type { AppBskyFeedDefs } from '@atproto/api';
	import Author from '$lib/components/author.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	interface CommentProps {
		reply: AppBskyFeedDefs.ThreadViewPost;
		index?: number;
	}

	const { reply, index = 0 }: CommentProps = $props();
	const post = $derived(reply.post);

	// $inspect(reply);
</script>

<Card.Root
	class="mb-4 w-full bg-white/80 shadow-lg ring-1 ring-white/40 backdrop-blur-sm sm:z-{index +
		1} transition-transform sm:-mb-4 sm:max-w-sm"
>
	<Card.Header>
		<div class="flex max-w-full gap-2 truncate">
			<Author author={post.author} />
		</div>
		<p class="mb-2 break-words">{post.record.text}</p>
	</Card.Header>
	<Card.Content></Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
