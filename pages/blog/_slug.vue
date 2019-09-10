<template>
  <main>
    <div
      class="full-height single xs-border-left xs-border-right"
      :style="`min-height:calc(100vh - ${navbarheight}px); margin-top:${navbarheight}px`"
    >
      <div class="xs-mt2 xs-p2 bcg-item">
        <div class="item xs-block xs-full-height">
          <div class="feat-wrapper" v-if="theThumb">
            <transition appear name="fade">
              <img class="featured-image" :src="thumbnail" :alt="title" />
            </transition>
          </div>
          <h1 class="xs-py3 main-title">{{title}}</h1>
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
          <div class="xs-py3 post-content text-gray-lighter">
            <div v-html="$md.render(body)"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>



<script>
export default {
	async asyncData({ params, app, payload, route, store }) {
		let post = await import('~/content/blog/posts/' + params.slug + '.json');
		console.log(post);

		await store.commit('SET_TITLE', post.title);
		await store.commit('SET_THUMB', post.thumbnail);
		await store.commit('SET_CRUMB', 'Blog');
		await store.commit('SET_POSTCAT', post.category);
		await store.commit('paginateOff', false);
		return post;
	},
	transition(to, from) {
		if (!from) {
			return 'slide-left';
		} else {
			return 'slide-right';
		}
	},
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
