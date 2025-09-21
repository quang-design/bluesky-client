import type { Transport } from '@sveltejs/kit';
import { BlobRef } from '@atproto/api';
import { CID } from 'multiformats/cid';

export const transport: Transport = {
	BlobRef: {
		encode(value) {
			if (!(value instanceof BlobRef)) return false;
			return {
				ref: value.ref.toString(),
				mimeType: value.mimeType,
				size: value.size
			};
		},
		decode({ ref, mimeType, size }) {
			return new BlobRef(CID.parse(ref), mimeType, size);
		}
	}
};
