import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../../components/Layout"
import * as styles from "../../styles/projects.module.css"
import Img from "gatsby-image"

const project = ({ data }) => {
  console.log(data)
  const projects = data.projects.nodes
  const contact = data.contact.siteMetadata.contact

  return (
    <Layout>
      <div className={styles.portfolio}>
        <h2>Portfolio</h2>
        <h3>Project & websites I've Created</h3>
        <div className={styles.projects}>
          {projects.map(project => (
            <Link key={project.id} to={"/projects/" + project.frontmatter.slug}>
              <div>
                <Img fluid={project.frontmatter.thumb.childImageSharp.fluid} />
                <h3>{project.frontmatter.title}</h3>
                <p>{project.frontmatter.stack}</p>
              </div>
            </Link>
          ))}
        </div>
        <p>Like what you see? Email me at {contact} for a quote!</p>
      </div>
    </Layout>
  )
}

export default project

// #export page query
// export const query = graphql`
//   query ProjectsPage {
//     allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
//       nodes {
//         frontmatter {
//           title
//           stack
//           slug
//         }
//         id
//       }
//     }
//     site {
//       siteMetadata {
//         contact
//       }
//     }
//   }
// `

// * or *

export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          stack
          slug
          thumb {
            id
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        id
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`
