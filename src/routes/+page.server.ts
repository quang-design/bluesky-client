import { agent } from '$lib/api';
import type { PageServerLoad } from './$types';
import type { AppBskyFeedGetFeed, AppBskyFeedPost } from '@atproto/api';

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

	const data: AppBskyFeedGetFeed.OutputSchema = res.data;

	// Map to a plain serializable structure to avoid non-POJO fields (e.g., embed image blobs)
	const feed: Array<{
		uri: string;
		cid: string;
		author: { did: string; handle: string; displayName?: string; avatar?: string };
		record: { text?: string; createdAt?: string };
		likeCount?: number;
		repostCount?: number;
		replyCount?: number;
	}> = data.feed.map((item) => {
		const r = (item.post.record ?? {}) as Partial<AppBskyFeedPost.Record>;
		return {
			uri: item.post.uri,
			cid: item.post.cid,
			author: {
				did: item.post.author.did,
				handle: item.post.author.handle,
				displayName: item.post.author.displayName,
				avatar: item.post.author.avatar
			},
			record: {
				text: r.text,
				createdAt: r.createdAt
			},
			likeCount: item.post.likeCount,
			repostCount: item.post.repostCount,
			replyCount: item.post.replyCount
		};
	});

	//TODO: maybe some data is missing from deserialization... like image? but anyway, it works!

	return {
		feed,
		nextPage: data.cursor
	};
};
