const ghpages = require("gh-pages")

ghpages.publish(
  "public",
  {
    branch: "main",
    repo: "https://github.com/alekspopovic/super-secret-live",
  },
  () => {
    console.log("Deploy Complete!")
  }
)
