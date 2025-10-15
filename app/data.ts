type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
  thumbnail?: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  language: string
  uid: string
  thumbnail?: string
  tags: string[]
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Erazor',
    description: 'Erase, Edit and Save images in seconds. Remove unwanted objects, people, watermarks from your photos.',
    link: 'https://www.erazor.app/',
    video:
      'https://www.loom.com/share/ef454a1a7d574d448c4136d118b35de5?sid=39b63bf4-8c6f-4def-862d-2800faf2d608',
    thumbnail: '/projects/project-1.jpeg',
    id: 'project-1',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Dev Cluster',
    title: 'Frontend Engineer',
    start: 'Jun 2024',
    end: 'Dec 2024',
    link: 'https://dev-cluster.com',
    id: 'work1',
  }
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'JavaScript Internals: How __proto__, prototype, and inheritance actually work',
    description: 'A deep dive into the mechanics of JavaScript’s object system.',
    link: '/blog/javascript-internals-how-__proto__-prototype-and-inheritance-actually-work',
    uid: 'blog-4',
    language: 'bn',
    thumbnail: '/blogs/js-internals.webp',
    tags: ["JavaScript", "Programming", "Web Development"],
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/ShejanMahamud',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/dev_shejan',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/md-shejanmahamud',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/shejanmahamud.me',
  },
]

export const EMAIL = 'dev.shejanmahamud@gmail.com'
