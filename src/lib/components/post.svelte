<script lang="ts">
	import type { AppBskyFeedDefs, AppBskyEmbedImages } from '@atproto/api';
	import Author from '$lib/components/author.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	interface PostProps {
		post: AppBskyFeedDefs.FeedViewPost['post'];
	}

	const { post }: PostProps = $props();
	const { author, embed, record, likeCount, quoteCount, uri } = $derived(post);

	$inspect(post);
</script>

<Card.Root>
	<Card.Header>
		<Author {author} />
	</Card.Header>
	<Card.Content>
		<p class="break-words">{record.text}</p>

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
									<img src={image.thumb} alt={image.alt} class="w-full rounded object-cover" />
								</Carousel.Item>
							{/each}
						</Carousel.Content>
						<!-- <Carousel.Previous />
						<Carousel.Next /> -->
					</Carousel.Root>
				{:else}
					<img
						src={(embed as AppBskyEmbedImages.View).images[0].thumb}
						alt={(embed as AppBskyEmbedImages.View).images[0].alt}
						class="w-full rounded object-cover"
					/>
				{/if}
			{/if}
		{/if}
	</Card.Content>
	<Card.Footer>
		<p>Like: {likeCount}</p>
		<p>Quote: {quoteCount}</p>
	</Card.Footer>
</Card.Root>
