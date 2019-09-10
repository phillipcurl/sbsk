<template>
  <div>
    <section v-if="thumbnail">
      <transition appear name="fade">
        <img :src="thumbnail" :alt="title" />
      </transition>
    </section>
    <div>
      <h1 class="text-6xl font-black">{{title}}</h1>
      <md-wrapper :content="body" />
    </div>
  </div>
</template>

<script>
export default {
	async asyncData({ params, app, payload, route, store }) {
		let post = await import('~/content/page/posts/' + params.page + '.json');
		console.log(post);
		await store.commit('SET_TITLE', post.title);

		return post;
	},
	// transition(to, from) {
	// 	if (!from) {
	// 		return 'slide-left';
	// 	} else {
	// 		return 'slide-right';
	// 	}
	// },
	head() {
		return {
			title: this.title + ' | ' + this.$store.state.siteInfo.sitename
		};
	},
	data() {
		return {};
	},
	methods: {},
	updated() {
		if (process.browser) {
			this.$nextTick(() => {
				this.$store.commit('paginateOff', false);

				console.log('slug updated');
			});
		}
	},
	mounted() {
		if (process.browser) {
			this.$nextTick(() => {
				this.$store.commit('paginateOff', false);
				console.log('slug mounted');
			});
		}
	},

	computed: {
		allBlogPosts() {
			return this.$store.state.blogPosts;
		},
		navbarheight() {
			return this.$store.state.navheight;
		}
	}
};
</script>
