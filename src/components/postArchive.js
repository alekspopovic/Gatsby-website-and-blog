import React from "react"
import { Link } from "gatsby"
import archiveStyles from "../styles/archive.module.css"

class PostArchive extends React.Component {
  render() {
    const { history } = this.props;

    // console.log(history);

    return (
      <div className={archiveStyles.archive}>
        {Object.keys(history).map((year) => (
            <div key={year} className={archiveStyles.year}>
                {year}
                {Object.keys(history[year]).map((month) => (
                    <div key={month}  className={archiveStyles.month}>
                        {month}
                        ({history[year][month].postCount})
                        {history[year][month].posts.map((post) => (
                            <div key={post.slug} className={archiveStyles.post}>
                                <Link to={post.slug}>{post.title}</Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ))}
      </div>
    )
  }
}

export default PostArchive