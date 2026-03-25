export interface VideoItem {
  url: string;
  title: string;
  description: string;
  platform: "youtube" | "instagram";
}

export interface VideoCategory {
  name: string;
  slug: string;
  videos: VideoItem[];
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\s]+)/);
  return match ? match[1] : null;
}

function getInstagramId(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel)\/([^/?]+)/);
  return match ? match[1] : null;
}

export function getThumbnail(video: VideoItem): string {
  if (video.platform === "youtube") {
    const id = getYouTubeId(video.url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  }
  // Instagram doesn't easily provide thumbnails without API, use a placeholder approach
  return "";
}

export function getEmbedUrl(video: VideoItem): string {
  if (video.platform === "youtube") {
    const id = getYouTubeId(video.url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";
  }
  const id = getInstagramId(video.url);
  return id ? `https://www.instagram.com/p/${id}/embed/` : "";
}

export const portfolioData: VideoCategory[] = [
  {
    name: "Gaming Content",
    slug: "gaming",
    videos: [
      { url: "https://youtu.be/RLC16C--KAE", title: "Gaming Edit #1", description: "High-energy gaming montage", platform: "youtube" },
      { url: "https://youtu.be/K03nXU6tyzM", title: "Gaming Edit #2", description: "Cinematic gameplay highlights", platform: "youtube" },
      { url: "https://youtu.be/Dq630xJATQ4", title: "Gaming Edit #3", description: "Dynamic gaming sequence", platform: "youtube" },
    ],
  },
  {
    name: "MUN",
    slug: "mun",
    videos: [
      { url: "https://youtu.be/bmbWzVXXuCE", title: "MUN Highlight #1", description: "Model United Nations coverage", platform: "youtube" },
      { url: "https://youtu.be/hkCuBnXk7mw", title: "MUN Highlight #2", description: "Conference recap edit", platform: "youtube" },
    ],
  },
  {
    name: "UCR AAG",
    slug: "ucr-aag",
    videos: [
      { url: "https://www.instagram.com/p/CtkFtjzA7qe/", title: "AAG Post #1", description: "Organization highlight reel", platform: "instagram" },
      { url: "https://www.instagram.com/p/CuLM-qSgnqy/", title: "AAG Post #2", description: "Event coverage", platform: "instagram" },
      { url: "https://www.instagram.com/p/Cuh3VAcA_t4/", title: "AAG Post #3", description: "Community spotlight", platform: "instagram" },
      { url: "https://www.instagram.com/p/CvYCeSMtxxz/", title: "AAG Post #4", description: "Creative promo edit", platform: "instagram" },
      { url: "https://www.instagram.com/p/CxhBu8ApLEZ/", title: "AAG Post #5", description: "Social media content", platform: "instagram" },
    ],
  },
  {
    name: "VP Campaign",
    slug: "vp-campaign",
    videos: [
      { url: "https://youtu.be/swVVeW4ytpA", title: "VP Campaign Video", description: "Campaign promotional video", platform: "youtube" },
    ],
  },
  {
    name: "School Projects",
    slug: "school",
    videos: [
      { url: "https://youtu.be/AxZeMDCi_hY", title: "School Project #1", description: "Academic video project", platform: "youtube" },
      { url: "https://youtu.be/EL2QeZev-w0", title: "School Project #2", description: "Educational content edit", platform: "youtube" },
    ],
  },
  {
    name: "Random Edits",
    slug: "random",
    videos: [
      { url: "https://youtu.be/BpYLqoXrh2A", title: "Creative Edit", description: "Experimental video edit", platform: "youtube" },
    ],
  },
];
