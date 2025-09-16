<script lang="ts">
	const { post } = $props();
	const text = post?.record?.text ?? '';
	$inspect(post);
</script>

<li>{text}</li>
