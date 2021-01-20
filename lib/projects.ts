import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const contentDir = path.join(process.cwd(), 'content')
const projectsDir = path.join(contentDir, 'projects')

export interface IContent {
  frontmatter: Record<string, any>
  content: string
  slug: string
}

export interface IProject extends IContent {
  frontmatter: {
    type: string
    path: string
    github: string
    link: string | null
    tech: string[]
    title: string
    blurb: string
  }
}

export async function getContentBySlug(slug: string) {
  const fullPath = path.join(contentDir, `${slug}`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return {
    frontmatter: data,
    content: await markdownToHtml(content),
    slug,
  }
}

export function getProjectBySlug(slug: string) {
  return getContentBySlug(`/projects/${slug}`)
}

export function getAllProjects() {
  const projectSlugs = getProjectSlugs()
  return projectSlugs.map((slug) => getContentBySlug('projects/' + slug))
}

export function getProjectSlugs() {
  return fs.readdirSync(projectsDir)
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
