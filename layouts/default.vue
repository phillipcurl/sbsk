<template>
  <div class="w-full h-full">
    <header class="w-full text-center flex flex-col items-center py-6">
      <nuxt-link to="/" exact>
        <h3 class="text-5xl font-black mb-4">sbsk</h3>
      </nuxt-link>
      <nav>
        <ul>
          <li v-for="page in pages" :key="page._path">
            <nuxt-link :to="page._path">{{page.title}}</nuxt-link>
          </li>
        </ul>
      </nav>
      <site-search
        placeholder="Search"
        :compResults="compResults"
        :keys="keys"
        :list="allPosts"
        event-name="searchChanged"
      />
    </header>
    <main class="w-full container mx-auto px-4 py-8">
      <nuxt />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import SiteSearch from '~/components/SiteSearch';

export default {
	data() {
		return {
			results: [],
			keys: [
				{
					name: 'title',
					weight: 0.7
				},
				{
					name: 'body',
					weight: 0.3
				}
			],
			compResults: []
		};
	},
	computed: {
		paginate() {
			return this.$store.state.pagination;
		},
		blogposts() {
			return this.$store.state.blog.blogPosts;
		},
		blogtitle() {
			return this.$store.state.blog.blogTitle;
		},
		allPosts() {
			let posts = this.$store.state.blog.blogPosts;
			let pages = this.$store.state.pages.allPages;
			return posts.concat(pages);
		},
		headerSiteName() {
			return this.$store.state.siteInfo.sitename;
		},
		componentResults() {
			return this.$store.state.results;
		},
		pages() {
			return this.$store.state.pages.allPages;
		},
		crumb() {
			return this.$store.state.theCrumb;
		}
	},
	mounted() {
		this.$on('searchChanged', (results) => {
			this.compResults = results;
		});
	},
	components: {
		SiteSearch
	}
};
</script>

<style>
.slide-left-enter,
.slide-right-leave-active {
	transform: translate(50%, 0);
	opacity: 0;
	transition: all 0.25s;
}
.slide-left-leave-active,
.slide-right-enter {
	transform: translate(-50%, 0);
	opacity: 0;
	transition: all 0.25s;
}
.slide-down-enter,
.slide-up-leave-active {
	transform: translate(0, 50%);
	opacity: 1;
	transition: all 0.25s;
}
.slide-down-leave-active,
.slide-up-enter {
	transform: translate(0, -50%);
	opacity: 1;
	transition: all 0.25s;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
	transition-delay: 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
