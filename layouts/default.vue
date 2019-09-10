<template>
  <div>
    <main>
      <nuxt />
    </main>
    <footer>
      <site-search
        placeholder="Search"
        :compResults="compResults"
        :keys="keys"
        :list="allPosts"
        event-name="searchChanged"
      />
    </footer>
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
			return this.$store.state.blogPosts;
		},
		blogtitle() {
			return this.$store.state.blogTitle;
		},
		allPosts() {
			let posts = this.$store.state.blogPosts;
			let pages = this.$store.state.allPages;
			let both = posts.concat(pages);
			return both;
		},
		headerSiteName() {
			return this.$store.state.siteInfo.sitename;
		},
		componentResults() {
			return this.$store.state.results;
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
