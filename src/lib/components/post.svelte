<script lang="ts">
	const { post } = $props();

	const record = $derived(post.record);
</script>

<li>{record.text}</li>
