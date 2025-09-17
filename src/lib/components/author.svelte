<script lang="ts">
	import type { AppBskyFeedDefs } from '@atproto/api';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	interface AuthorProps {
		author: AppBskyFeedDefs.FeedViewPost['post']['author'];
	}

	const { author }: AuthorProps = $props();

	function getInitial(name: string | undefined) {
		if (!name) return 'AQ';

		return name
			.replace(/[^A-Za-z]/g, ' ')
			.trim()
			.split(/\s+/)
			.map((w) => w[0]?.toUpperCase())
			.filter(Boolean)
			.join('')
			.slice(0, 2);
	}
</script>

<div class="flex items-center gap-2">
	<Avatar.Root class="border border-gray-200">
		<Avatar.Image src={author.avatar} alt={author.handle} />
		<Avatar.Fallback>{getInitial(author.displayName)}</Avatar.Fallback>
	</Avatar.Root>

	<div class="text-sm">
		<h3 class="font-semibold">{author.displayName}</h3>
		<p class="text-muted-foreground">{author.handle}</p>
	</div>
</div>
