export interface FaqItem {
  q: string
  a: string
}

export interface ReviewFrontmatter {
  title: string
  slug: string
  description: string
  date: string
  category: Category
  brand: string
  model: string
  rating: number
  price: number
  currency: string
  image: string
  pros: string[]
  cons: string[]
  specs: Record<string, string>
  affiliateLinks: AffiliateLink[]
  featured?: boolean
}

export interface ComparativaFrontmatter {
  title: string
  slug: string
  description: string
  date: string
  productA: CompareProduct
  productB: CompareProduct
  verdict: string
  winner: 'A' | 'B' | 'tie'
  faqs?: FaqItem[]
}

export interface MejorFrontmatter {
  title: string
  slug: string
  description: string
  date: string
  category: Category
  maxPrice: number
  currency: string
  products: MejorProduct[]
  faqs?: FaqItem[]
  buyingGuideTitle?: string
}

export interface CompareProduct {
  name: string
  brand: string
  image: string
  price: number
  rating: number
  pros: string[]
  cons: string[]
  specs: Record<string, string>
  affiliateLinks: AffiliateLink[]
}

export interface MejorProduct {
  rank: number
  name: string
  brand: string
  image: string
  price: number
  rating: number
  description: string
  pros: string[]
  affiliateLinks: AffiliateLink[]
}

export interface AffiliateLink {
  store: 'amazon' | 'pccomponentes' | 'mediamarkt' | 'fnac'
  url: string
  price: number
  currency: string
}

export type Category =
  | 'portatiles'
  | 'moviles'
  | 'auriculares'
  | 'tablets'
  | 'monitores'

export const CATEGORY_LABELS: Record<Category, string> = {
  portatiles: 'Portátiles',
  moviles: 'Móviles',
  auriculares: 'Auriculares',
  tablets: 'Tablets',
  monitores: 'Monitores',
}

export const STORE_LABELS: Record<AffiliateLink['store'], string> = {
  amazon: 'Amazon',
  pccomponentes: 'PcComponentes',
  mediamarkt: 'MediaMarkt',
  fnac: 'Fnac',
}
