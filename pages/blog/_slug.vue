<template>
  <div>
    <section v-if="theThumb">
      <transition appear name="fade">
        <img :src="thumbnail" :alt="title" />
      </transition>
    </section>
    <div>
      <h1 class="text-6xl font-black">{{title}}</h1>
      <no-ssr>
        <div class="xs-mt-5 bold">
          <ul class="list-unstyled xs-flex xs-flex-align-center">
            <li class="xs-inline-block xs-mr1" v-if="this.$store.state.theCategory">
              <div class="tag fill-gray-darker xs-border">
                <nuxt-link
                  :to="`/category/${this.$store.state.theCategory.toLowerCase()}`"
                  class="tag__link text-white"
                >{{this.$store.state.theCategory}}</nuxt-link>
              </div>
            </li>
            <li class="xs-inline-block">{{ date }}</li>
          </ul>
        </div>
      </no-ssr>
      <md-wrapper :content="body" />
    </div>
  </div>
</template>



<script>
export default {
	async asyncData({ params, app, payload, route, store }) {
		let post = await import('~/content/blog/posts/' + params.slug + '.json');
		console.log(post);

		await store.commit('SET_TITLE', post.title);
		await store.commit('blog/SET_THUMB', post.thumbnail);
		await store.commit('SET_CRUMB', 'Blog');
		await store.commit('blog/SET_POSTCAT', post.category);
		await store.commit('paginateOff', false);
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

	computed: {
		theThumb() {
			return this.$store.state.theThumbnail;
		},
		allBlogPosts() {
			return this.$store.state.blogPosts;
		},
		navbarheight() {
			return this.$store.state.navheight;
		}
	}
};
</script>
