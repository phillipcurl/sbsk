<template>
  <div>
    <h1>Category</h1>
    <div v-for="post in findCatPosts" :key="post.title">
      <pre>{{post}}</pre>
    </div>
  </div>
</template>

<script>
export default {
	async asyncData({ params, app, payload, route, store }) {
		if (params.slug) {
			let post = await import(
				'~/content/categories/posts/' + params.slug + '.json'
			);

			console.log(post);
			await store.commit('SET_TITLE', post.title);
			await store.commit('SET_CRUMB', 'Categories');
			return post;
		} else {
			await store.commit('SET_TITLE', 'All Categories');
			await store.commit('SET_CRUMB', 'All Categories');
			return {
				post: {
					title: ''
				}
			};
		}
	},
	head() {
		return {
			title: this.title + ' | ' + this.$store.state.siteInfo.sitename
		};
	},
	transition(to, from) {
		if (!from) return 'slide-right';
		return +to.query.page > +from.query.page ? 'slide-right' : 'slide-left';
	},
	data() {
		return {};
	},

	computed: {
		allBlogPosts() {
			return this.$store.state.blogPosts;
		},

		findCatPosts() {
			var posts = this.allBlogPosts;
			var title = this.title;
			return posts.filter(function(obj) {
				return obj.category == title;
			});
		}
	}
};
</script>

<style>
</style>
