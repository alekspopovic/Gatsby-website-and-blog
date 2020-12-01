import { graphql, useStaticQuery } from "gatsby"

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allDevArticles {
        edges {
          node {
            article {
              title
              positive_reactions_count
              comments_count
            }
          }
        }
      }
    }
  `)
  return data.allDevArticles.edges.map(post => ({
    id: post.node.article.id,
    title: post.node.article.title,
    likes: post.node.article.positive_reactions_count,
    comments: post.node.article.comments_count,
  }))
}

export default usePosts
