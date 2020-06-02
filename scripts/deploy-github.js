const ghpages = require("gh-pages")

ghpages.publish(
  "public",
  {
    branch: "master",
    repo: "https://github.com/alekspopovic/alekspopovic.github.io",
  },
  () => {
    console.log("Deploy Complete!")
  }
)
