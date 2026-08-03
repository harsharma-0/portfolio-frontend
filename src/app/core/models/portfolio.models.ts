export interface ApiResponse<T> { success: boolean; message: string; data: T }
export interface Metric { label: string; value: string }
export interface Profile { name: string; location: string; headline: string; secondary_headline: string; availability: string; summary: string; links: Record<string, string>; metrics: Metric[] }
export interface GalleryImage { path: string; caption: string; alt: string }
export interface Project { id: number; slug: string; title: string; short_title: string; summary: string; description: string; category: string; featured: boolean; year: number; duration?: string; company?: string; role?: string; work_mode?: string; status: string; technologies: string[]; responsibilities: string[]; challenges: string[]; solutions: string[]; outcomes: string[]; metrics: Metric[]; keywords?: string[]; supported_scenarios?: string[]; gallery: GalleryImage[]; links: Record<string, string>; display_order: number }
export interface Skill { name: string; category: string; proficiency: string; description: string; related_project_slugs: string[]; display_order: number }
export interface Experience { type: string; role: string; organization: string; start: string; end: string; summary: string; highlights: string[]; related_project_slugs?: string[]; display_order: number }
export interface Service { name: string; description: string; deliverables: string[]; suitable_for: string[]; cta_label: string; display_order: number }
export interface Achievement { title: string; description: string; year: string; display_order: number }
export interface Testimonials { publication_note: string; items: { quote: string; author: string; context: string; is_sample: boolean; display_order: number }[] }
export interface Portfolio { profile: Profile; projects: Project[]; skills: Skill[]; experience: Experience[]; services: Service[]; achievements: Achievement[]; testimonials: Testimonials }
export interface ProjectFilters { category?: string; technology?: string; featured?: boolean; search?: string }
export type Budget = 'under-500'|'500-1000'|'1000-2500'|'2500-5000'|'5000-plus'|'discuss';
export type Timeline = 'urgent'|'1-2-weeks'|'2-4-weeks'|'1-3-months'|'flexible';
export interface ContactRequest { name: string; email: string; service: string; budget: Budget; timeline: Timeline; subject: string; message: string; attachment_link?: string|null; website: string; consent: boolean }
export interface FeedbackRequest { name: string; email?: string|null; project_slug: string; feedback_type: 'comment'|'appreciation'|'project-inquiry'; message: string; website: string }
export interface TextAnalysis { character_count:number; character_count_excluding_spaces:number; word_count:number; unique_word_count:number; sentence_count:number; average_word_length:number; most_frequent_words:{word:string;count:number}[]; estimated_reading_time_minutes:number; uppercase_count:number; lowercase_count:number; digit_count:number; special_character_count:number }
export interface JsonInspection { json_type:string; total_keys:number; maximum_depth:number; objects:number; arrays:number; strings:number; numbers:number; booleans:number; nulls:number; pretty_json:string; flattened_key_paths:string[]; paths_truncated:boolean }
export interface TransformItem { name:string; category:string; score:number }
export interface TransformRequest { items:TransformItem[]; search:string; category:string; sort_by:'name'|'category'|'score'; sort_order:'asc'|'desc'; page:number; page_size:number }
export interface TransformResult { items:TransformItem[]; pagination:{page:number;page_size:number;total_items:number;total_pages:number;has_next:boolean;has_previous:boolean} }
