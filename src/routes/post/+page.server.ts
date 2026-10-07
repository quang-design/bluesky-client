import { error } from '@sveltejs/kit';
import { agent } from '$lib/api';
import { AppBskyFeedDefs, AppBskyFeedGetPostThread, AppBskyFeedPost } from '@atproto/api';

import type { PageServerLoad } from './$types';

const EXAMPLE_POST = 'at://did:plc:vwzwgnygau7ed7b7wt5ux7y2/app.bsky.feed.post/3karfx5vrvv23';

export const load = (async ({ url }) => {
	let uri = url.searchParams.get('uri');

	if (!uri) uri = EXAMPLE_POST;

	let response: AppBskyFeedGetPostThread.Response;
	try {
		response = await agent.app.bsky.feed.getPostThread({
			uri: uri
		});
	} catch (err) {
		if (err instanceof AppBskyFeedGetPostThread.NotFoundError) {
			error(404, 'Post not found');
		}
		throw err;
	}

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
