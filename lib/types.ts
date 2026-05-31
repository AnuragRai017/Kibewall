export interface Wallpaper {
  id: string
  url: string
  short_url: string
  views: number
  favorites: number
  source: string
  purity: string
  category: string
  dimension_x: number
  dimension_y: number
  resolution: string
  ratio: string
  file_size: number
  file_type: string
  created_at: string
  colors: string[]
  path: string
  thumbs: {
    large: string
    original: string
    small: string
  }
  tags?: Tag[]
  uploader?: {
    username: string
    group: string
    avatar: {
      [key: string]: string
    }
  }
}

export interface Tag {
  id: number
  name: string
  alias: string
  category_id: number
  category: string
  purity: string
  created_at: string
}

export interface SearchResponse {
  data: Wallpaper[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    query?: string | { id: number; tag: string }
    seed?: string | null
  }
}

export interface WallpaperResponse {
  data: Wallpaper
}
