import TypeScript from '@/components/technologies/TypeScript';
import CSS from '@/components/technologies/CSS';
import Vite from '@/components/technologies/Vite';
import { getGithubRepoUrl } from '@/config/Github';
import { Project } from '@/types/project';

const stackViteTsCss = ['Vite', 'TypeScript', 'CSS'];

export const projects: Project[] = [
  {
    title: 'Harikrushna Agro Chemicals',
    theme: 'green',
    slug: 'harikrushna-agro',
    description:
      'A professional business website for an agro chemicals company showcasing their products and services.',
    fullDescription:
      'A marketing-focused site built to present Harikrushna Agro Chemicals with clear product information, trust-building visuals, and easy ways for farmers and partners to get in touch. The layout emphasizes readability, fast loading, and a professional tone suited to the agriculture sector.',
    features: [
      'Product and service sections with structured content',
      'Responsive layout for mobile and desktop visitors',
      'Contact and inquiry paths for business leads',
      'Performance-oriented static delivery',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Presenting technical product information in a way that stays accessible to non-technical visitors while keeping the brand credible and consistent.',
    solutions:
      'Used a clear information hierarchy, consistent typography, and section-based layout so users scan quickly; paired Vite’s fast builds with optimized assets for a smooth experience.',
    image: '/project/harikrushna-agro.png',
    link: 'https://www.harikrushnaagrochemicals.in/',
    live: 'https://www.harikrushnaagrochemicals.in/',
    github: getGithubRepoUrl('harikrushn-agro-hub'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
  {
    title: 'Zack Salon',
    theme: 'orange',
    slug: 'zack-salon',
    description:
      'A premium salon website with elegant design showcasing services, pricing and booking experience.',
    fullDescription:
      'Zack Salon’s site highlights premium services and atmosphere through refined typography, imagery, and spacing. It is built to feel upscale on every viewport and to guide visitors from discovery to booking or contact.',
    features: [
      'Service and pricing presentation',
      'Polished visual hierarchy and imagery',
      'Mobile-first responsive design',
      'Clear calls-to-action',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Balancing a luxury aesthetic with fast load times and straightforward navigation for first-time visitors.',
    solutions:
      'Lean CSS, image-conscious layout, and predictable section flow so the brand feels premium without heavy client-side complexity.',
    image: '/project/zack-salon.png',
    link: 'https://z-ack-salon-premium.vercel.app/',
    live: 'https://z-ack-salon-premium.vercel.app/',
    github: getGithubRepoUrl('z-ack-salon-premium'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
  {
    title: 'Vala Gym',
    theme: 'blue',
    slug: 'vala-gym',
    description:
      'A modern gym website showcasing membership plans, training programs and facilities.',
    fullDescription:
      'Vala Gym’s web presence focuses on motivation and clarity: membership options, training highlights, and facility appeal are easy to find. The UI supports quick scanning and repeat visits from members checking schedules or offers.',
    features: [
      'Membership and program highlights',
      'Facility-focused imagery and sections',
      'Responsive layout for on-the-go users',
      'Consistent branding across pages',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Communicating energy and strength in the design without cluttering the page or slowing interactions.',
    solutions:
      'Strong section structure, bold headings, and restrained motion so content stays readable and the site stays snappy.',
    image: '/project/vala-gym.png',
    link: 'https://vala-gymj.vercel.app/',
    live: 'https://vala-gymj.vercel.app/',
    github: getGithubRepoUrl('vala-gym'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
  {
    title: 'Maniax Dance',
    theme: 'purple',
    slug: 'maniax-dance',
    description:
      'A vibrant dance academy website showcasing classes, instructors and performance events.',
    fullDescription:
      'Built to reflect the energy of a dance academy: classes, instructors, and events are showcased with a bold, colorful presentation. The site targets students and parents looking for schedules and style in one place.',
    features: [
      'Class and program highlights',
      'Instructor and event sections',
      'Expressive visual design',
      'Responsive experience across devices',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Capturing a lively brand in the UI while keeping navigation obvious for users who want practical information fast.',
    solutions:
      'Vibrant accents paired with a simple top-level structure so personality shows in the visuals, not in confusing navigation.',
    image: '/project/maniax-dance.png',
    link: 'https://maniaxdancedemo.vercel.app/',
    live: 'https://maniaxdancedemo.vercel.app/',
    github: getGithubRepoUrl('maniaxdance-demo-webapp'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
  {
    title: 'Mira Collection',
    theme: 'neutral',
    slug: 'mira-collection',
    description:
      'A premium clothing collection website with elegant product showcase and modern shopping experience.',
    fullDescription:
      'Mira Collection presents apparel with a boutique feel: product grids, storytelling sections, and a clean path to explore the line. The experience is tuned for fashion shoppers who expect polish on mobile and desktop.',
    features: [
      'Product showcase and collection layout',
      'Elegant typography and spacing',
      'Mobile-friendly browsing',
      'Brand-forward visual design',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Making product imagery and text work together so the collection feels premium without overwhelming the user.',
    solutions:
      'Grid-based product sections, consistent card sizing, and careful spacing so each piece gets attention.',
    image: '/project/mira-collection.png',
    link: 'https://cloth-collection-premium-demobuildj.vercel.app/',
    live: 'https://cloth-collection-premium-demobuildj.vercel.app/',
    github: getGithubRepoUrl('mira-collection-premium-build'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
  {
    title: 'Mahalaxmi Taxi',
    theme: 'blue',
    slug: 'mahalaxmi-taxi',
    description:
      'A taxi service website with clean design showcasing cab booking, routes and contact information.',
    fullDescription:
      'Mahalaxmi Taxi’s site prioritizes trust and clarity: services, routes, and contact details are easy to find. It suits travelers and locals who need quick answers on a phone screen.',
    features: [
      'Service and route information',
      'Prominent contact options',
      'Clean, minimal UI',
      'Fast loading on mobile networks',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Serving users who need information in seconds—often on slow connections—without sacrificing a professional look.',
    solutions:
      'Minimal dependencies, straightforward sections, and touch-friendly targets so the site works well as a utility page.',
    image: '/project/mahalaxmi-taxi.png',
    link: 'https://taxidemoj.vercel.app/',
    live: 'https://taxidemoj.vercel.app/',
    github: getGithubRepoUrl('mahalaxmi'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
  {
    title: 'Auracelle Jewellery',
    theme: 'purple',
    slug: 'auracelle-jewellery',
    description:
      'A luxury jewellery brand website with stunning product showcase and premium visual experience.',
    fullDescription:
      'Auracelle Jewellery is presented with a luxury-first layout: rich imagery, restrained copy, and plenty of whitespace. The goal is to let each piece feel special while the brand stays cohesive.',
    features: [
      'High-impact product presentation',
      'Luxury-oriented layout and tone',
      'Responsive galleries and sections',
      'Consistent brand styling',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Luxury sites can easily become heavy; the challenge was to keep the feel upscale while staying performant.',
    solutions:
      'Careful image handling, CSS-driven layout, and avoiding unnecessary scripts so the showcase stays smooth.',
    image: '/project/auracelle-jewellery.png',
    link: 'https://jewelerydemoj.vercel.app/',
    live: 'https://jewelerydemoj.vercel.app/',
    github: getGithubRepoUrl('Jewellaryshowcase'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
  {
    title: 'The Coffee Bond',
    theme: 'orange',
    slug: 'coffee-bond',
    description:
      'A cozy coffee shop website showcasing menu, ambiance and the unique coffee experience.',
    fullDescription:
      'The Coffee Bond site invites visitors into the café’s story: menu highlights, ambiance, and brand personality come through in a warm, approachable layout suitable for social sharing and repeat visits.',
    features: [
      'Menu and experience sections',
      'Warm, café-inspired visuals',
      'Responsive layout',
      'Clear location and contact cues',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Conveying warmth and “third place” feeling without noisy animations or slow pages.',
    solutions:
      'Earthy palette cues, readable type, and static-first content so the site feels cozy and loads quickly.',
    image: '/project/coffee-bond.png',
    link: 'https://thecoffeebondj.vercel.app/',
    live: 'https://thecoffeebondj.vercel.app/',
    github: getGithubRepoUrl('coffee-bond-cafe'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
  {
    title: 'Sankalp Restaurant',
    theme: 'green',
    slug: 'sankalp-restaurant',
    description:
      'A restaurant website with appetizing design showcasing menu, ambiance and dining experience.',
    fullDescription:
      'Sankalp Restaurant’s site is built to make diners hungry for a visit: menu highlights, atmosphere, and practical details (hours, contact) are organized for quick decisions on mobile.',
    features: [
      'Menu and dining experience sections',
      'Appetizing visual hierarchy',
      'Mobile-first layout',
      'Straightforward information architecture',
    ],
    techStack: stackViteTsCss,
    challenges:
      'Restaurant visitors often browse on phones in distracting environments—the UI had to stay obvious and fast.',
    solutions:
      'Short sections, large tap targets, and prioritized content order so hours and menu win over decorative extras.',
    image: '/project/sankalp-restaurant.png',
    link: 'https://sankalrestaurantdemoj.vercel.app/',
    live: 'https://sankalrestaurantdemoj.vercel.app/',
    github: getGithubRepoUrl('sankalprestaurant'),
    technologies: [
      { name: 'Vite', icon: <Vite key="vite" /> },
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
