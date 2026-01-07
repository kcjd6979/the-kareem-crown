/**
 * Arsenal Section Video Data
 * Curated proof-of-work videos showcasing AI Systems Architecture,
 * Full-Stack Development, and Performance & SEO capabilities.
 */

export interface ArsenalItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  stats: {
    label: string;
    value: string;
  }[];
  tags: string[];
}

/**
 * Placeholder video data for development
 * Replace with actual video assets when ready
 * 
 * Video Specifications:
 * - Format: MP4 (H.264), 1920x1080 minimum
 * - Duration: 15-20 seconds loopable
 * - File size: <8MB each
 * - Encoding: No audio track (muted by default)
 */
export const arsenalData: ArsenalItem[] = [
  {
    id: 'ai-systems',
    title: 'AI Systems Architecture',
    subtitle: 'Autonomous Intelligence Framework',
    description: 'End-to-end AI pipeline orchestration with real-time decision making and adaptive learning capabilities.',
    videoSrc: '/videos/ai-systems-architecture.mp4',
    posterSrc: '/images/poster-ai-systems.webp',
    stats: [
      { label: 'Processing', value: '10K+/sec' },
      { label: 'Latency', value: '<50ms' },
      { label: 'Uptime', value: '99.9%' },
    ],
    tags: ['AI/ML', 'Automation', 'Pipeline'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    subtitle: 'Complete Digital Solutions',
    description: 'From concept to deployment—crafting seamless digital experiences across every platform and device.',
    videoSrc: '/videos/fullstack-development.mp4',
    posterSrc: '/images/poster-fullstack.webp',
    stats: [
      { label: 'Build Time', value: '-60%' },
      { label: 'Coverage', value: '95%+' },
      { label: 'Scale', value: 'Million+' },
    ],
    tags: ['React', 'Node.js', 'Cloud'],
  },
  {
    id: 'performance',
    title: 'Performance & SEO',
    subtitle: 'Visibility Engine',
    description: 'Data-driven optimization strategies that deliver measurable improvements in search rankings and site performance.',
    videoSrc: '/videos/performance-seo.mp4',
    posterSrc: '/images/poster-performance.webp',
    stats: [
      { label: 'Speed', value: '+85%' },
      { label: 'Ranking', value: 'Top 3' },
      { label: 'Traffic', value: '+200%' },
    ],
    tags: ['SEO', 'Optimization', 'Analytics'],
  },
];

/**
 * Get placeholder video URLs for development/testing
 * Uses free stock videos as temporary placeholders
 */
export const getPlaceholderVideos = (): string[] => {
  // Free placeholder video services for development
  return [
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  ];
};

export default arsenalData;
