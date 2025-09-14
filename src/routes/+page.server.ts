import { agent } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// TODO: finish this getFeed to return posts data

	const { data } = await agent.app.bsky.feed.getFeed(
		{
			feed: 'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot',
			limit: 30
		},
		{
			headers: {
				'Accept-Language': 'vi'
			}
		}
	);

	const { feed: postsArray, cursor: nextPage } = data;
	return {
		data: postsArray,
		nextPage
	};
};
