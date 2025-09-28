import { agent } from '$lib/api';
import { AppBskyFeedDefs, AppBskyFeedPost } from '@atproto/api';

import type { PageServerLoad } from './$types';
import type { AppBskyFeedGetPostThread } from '@atproto/api';

const EXAMPLE_POST = 'at://did:plc:vwzwgnygau7ed7b7wt5ux7y2/app.bsky.feed.post/3karfx5vrvv23';

export const load = (async ({ url }) => {
	let uri = url.searchParams.get('uri');

	// if uri is not provided, use example post for now
	if (!uri) uri = EXAMPLE_POST;

	const response: AppBskyFeedGetPostThread.Response = await agent.app.bsky.feed.getPostThread({
		uri: uri
	});

	if (!AppBskyFeedDefs.isThreadViewPost(response.data.thread))
		throw new Error('Expected a thread view post');

	const post = response.data.thread.post;

	if (!AppBskyFeedPost.isRecord(post.record)) throw new Error('Expected a post with a record');

	const replies = (response.data.thread.replies ?? []).map((reply) => {
		if (!AppBskyFeedDefs.isThreadViewPost(reply))
			throw new Error('Expected a thread view post reply');

		return reply;
	});

	return { post, replies };
}) satisfies PageServerLoad;
