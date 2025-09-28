<script lang="ts">
	import type { PageProps } from './$types';
	import Post from '$lib/components/post.svelte';
	import Comment from '$lib/components/comment.svelte';

	let { data }: PageProps = $props();

	const { post, replies } = $derived(data);

	let containerWidth = $state(0);

	const CARD_MAX_WIDTH = 384;

	let leftOffsets = $state<number[]>([]);
	let floatOffsets = $state<number[]>([]);

	$effect(() => {
		const replyList = replies ?? [];

		if (containerWidth < 640) {
			leftOffsets = replyList.map(() => 0);
		} else {
			const maxOffset = Math.max(0, containerWidth - CARD_MAX_WIDTH);
			leftOffsets = replyList.map(() => Math.floor(Math.random() * (maxOffset + 1)));
		}

		floatOffsets = replyList.map(() => Math.floor(Math.random() * 41) - 20);
	});

	// $inspect(post);
	// $inspect(replies);
</script>

<div class="container mx-auto flex w-full flex-col gap-6">
	<Post {post} />
	<section
		class="relative flex w-full min-w-0 flex-col items-center sm:items-start"
		bind:clientWidth={containerWidth}
	>
		{#each replies as reply, i}
			<div
				class="w-full max-w-full self-start transition-all duration-700 ease-out"
				style:margin-left={`${leftOffsets[i] ?? 0}px`}
				style:transform={`translateY(${floatOffsets[i] ?? 0}px)`}
			>
				<Comment {reply} index={i} />
			</div>
		{/each}
	</section>
</div>
