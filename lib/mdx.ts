import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { ReviewFrontmatter, ComparativaFrontmatter, MejorFrontmatter } from '@/types'

const CONTENT_PATH = path.join(process.cwd(), 'content')

function getFiles(dir: string): string[] {
  const fullDir = path.join(CONTENT_PATH, dir)
  if (!fs.existsSync(fullDir)) return []
  return fs.readdirSync(fullDir).filter((f) => f.endsWith('.mdx'))
}

function parseFile<T>(dir: string, slug: string) {
  const filePath = path.join(CONTENT_PATH, dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const { text: readingTimeText } = readingTime(content)
  return { frontmatter: data as T, content, slug, readingTime: readingTimeText }
}

export function getAllReviews() {
  return getFiles('reviews')
    .map((f) => parseFile<ReviewFrontmatter>('reviews', f.replace('.mdx', '')))
    .filter(Boolean)
    .sort((a, b) => new Date(b!.frontmatter.date).getTime() - new Date(a!.frontmatter.date).getTime())
}

export function getReview(slug: string) {
  return parseFile<ReviewFrontmatter>('reviews', slug)
}

export function getAllComparativas() {
  return getFiles('comparativas')
    .map((f) => parseFile<ComparativaFrontmatter>('comparativas', f.replace('.mdx', '')))
    .filter(Boolean)
}

export function getComparativa(slug: string) {
  return parseFile<ComparativaFrontmatter>('comparativas', slug)
}

export function getAllMejor() {
  return getFiles('mejor')
    .map((f) => parseFile<MejorFrontmatter>('mejor', f.replace('.mdx', '')))
    .filter(Boolean)
}

export function getMejor(slug: string) {
  return parseFile<MejorFrontmatter>('mejor', slug)
}

export function getReviewsByCategory(category: string) {
  return getAllReviews().filter((r) => r?.frontmatter.category === category)
}

export function getFeaturedReviews(limit = 3) {
  return getAllReviews()
    .filter((r) => r?.frontmatter.featured)
    .slice(0, limit)
}

export function getLatestReviews(limit = 6) {
  return getAllReviews().slice(0, limit)
}
