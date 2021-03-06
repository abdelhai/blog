import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                class="head"
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{
                    boxShadow: `none`,
                    color: `var(--headingcol)`,
                  }}
                  to={node.fields.slug}
                >
                  {title}
                </Link>
                </h3><></>
              <span>
                <small>
                  <b style={{ color: `var(--date)` }}>
                    {node.frontmatter.date}
                  </b>
                </small>
                <small style={{ color: `var(--ttr)` }}>
                  &nbsp;&nbsp;{node.timeToRead}&nbsp;min Read &nbsp;&nbsp;
                </small>
                <>
                {(node.frontmatter.new!=null) && <small className="new-label">NEW</small> }</>
              </span>
              <p
                class="desc"
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
            new
          }
          timeToRead
        }
      }
    }
  }
`
