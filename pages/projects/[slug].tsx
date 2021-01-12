import { getProjectSlugs, getProjectBySlug } from '../../lib/projects'

export default function ProjectPage({ project }) {
  return <pre>{JSON.stringify(project.frontmatter)}</pre>
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      project: await getProjectBySlug(`${slug}.md`),
    },
  }
}

export async function getStaticPaths() {
  const slugs = getProjectSlugs()
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug.split('.md')[0],
        },
      }
    }),
    fallback: false,
  }
}
