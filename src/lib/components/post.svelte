<script lang="ts">
	import type { AppBskyFeedDefs, AppBskyEmbedImages } from '@atproto/api';
	import Author from '$lib/components/author.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { ThumbsUp, MessageSquareQuote } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';

	interface PostProps {
		post: AppBskyFeedDefs.FeedViewPost['post'];
		index?: number;
	}

	const { post, index = 0 }: PostProps = $props();
	const { author, embed, record, likeCount, quoteCount, uri } = $derived(post);

	// $inspect(post);
</script>

<Card.Root class="mb-4 shadow-md sm:-mb-4 sm:max-w-sm sm:z-{index + 1} w-full">
	<Card.Header>
		<div class="flex max-w-full gap-2 truncate">
			<Author {author} />
		</div>
		<p class="mb-2 break-words">{record.text}</p>
	</Card.Header>
	<Card.Content class="grow">
		{#if embed}
			{#if embed.$type === 'app.bsky.embed.images#view'}
				{#if (embed as AppBskyEmbedImages.View).images.length > 1}
					<Carousel.Root
						opts={{
							align: 'start'
						}}
						class="w-full"
					>
						<Carousel.Content>
							{#each (embed as AppBskyEmbedImages.View).images as image}
								<Carousel.Item class="basis-9/10">
									<img src={image.thumb} alt={image.alt} class="w-full object-cover" />
								</Carousel.Item>
							{/each}
						</Carousel.Content>
					</Carousel.Root>
				{:else}
					<img
						src={(embed as AppBskyEmbedImages.View).images[0].thumb}
						alt={(embed as AppBskyEmbedImages.View).images[0].alt}
						class="w-full object-cover"
					/>
				{/if}
			{/if}
		{/if}
	</Card.Content>
	<Card.Footer class="flex flex-col items-start gap-2">
		<div class="flex items-center gap-2">
			{#if likeCount}
				<p class="inline-flex items-center gap-1">
					<ThumbsUp class="size-4 text-gray-400" />
					{likeCount}
					<span class="hidden sm:inline">{likeCount <= 1 ? 'like' : 'likes'}</span>
				</p>
			{/if}
			{#if quoteCount}
				<p class="inline-flex items-center gap-1">
					<MessageSquareQuote class="size-4 text-gray-400" />
					{quoteCount}
					<span class="hidden sm:inline">{quoteCount <= 1 ? 'quote' : 'quotes'}</span>
				</p>
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
