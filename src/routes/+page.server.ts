import { agent } from '$lib/api';
import type { PageServerLoad } from './$types';
import type { AppBskyFeedGetFeed } from '@atproto/api';

export const load: PageServerLoad = async () => {
	const res = await agent.app.bsky.feed.getFeed(
		{
			feed: 'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot',
			limit: 30
		} satisfies AppBskyFeedGetFeed.QueryParams,
		{
			headers: { 'Accept-Language': 'en' }
		}
	);

	const data = res.data satisfies AppBskyFeedGetFeed.OutputSchema;

	return {
		feed: data.feed,
		nextPage: data.cursor
	};
};
