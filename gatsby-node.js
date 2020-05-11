const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const kebabCase = require("lodash.kebabcase")
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges
  let tags = [];
  let postHistory = {};

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })

    // Get tags from each post

    if (post.node.frontmatter.tags) {
      tags = tags.concat(post.node.frontmatter.tags)
    }

    // Get post history

    let title = post.node.frontmatter.title;
    let slug = post.node.fields.slug;
    let date = post.node.frontmatter.date;

    addPostHistoryEntry(title, slug, date, postHistory);
  })

  createPaginatedPages({
    edges: posts,
    createPage: createPage,
    pageTemplate: 'src/templates/index.js',
    pageLength: 5,
    pathPrefix: '',
    context: {postHistory},
  })

  tags = removeDuplicateTags(tags);

  const tagTemplate = path.resolve("src/templates/tags.js")
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}

var removeDuplicateTags = array => {
  return array.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos
  })
}

var addPostHistoryEntry = (title, slug, postDate, postHistory) => {
  let date = new Date(postDate);

  let year = date.getFullYear();
  let month = date.toLocaleString('default', { month: 'long' });
  let day = date.getDate();

  let postHistoryData = {
    title: title,
    slug: slug,
  }

  if (!postHistory[year]) {
    postHistory[year] = {};
  }

  if (!postHistory[year][month]) {
    postHistory[year][month] = {
      posts: [],
      postCount: 0,
    };
  }

  postHistory[year][month].posts.push(postHistoryData);
  postHistory[year][month].postCount++;
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
