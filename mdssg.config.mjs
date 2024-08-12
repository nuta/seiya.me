export default {
  baseUrl: "https://seiya.me",
  feedOptions: {
    title: "seiya.me",
    id: "https://seiya.me",
    link: "https://seiya.me",
    author: {
      name: "Seiya Nuta",
    }
  },
  callbacks: {
    filterFeed(page) {
      return page.href != "/index";
    },
    postBuild({ pages, builder }) {

    }
  }
}
