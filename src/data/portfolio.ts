export interface VideoItem {
  url: string;
  title: string;
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
      { url: "https://youtu.be/RLC16C--KAE", title: "Fortnite Montage #1", platform: "youtube" },
      { url: "https://youtu.be/SUscw7BTZww", title: "Fortnite Montage #2", platform: "youtube" },
      { url: "https://youtu.be/Dq630xJATQ4", title: "Fortnite Montage #3", platform: "youtube" },
      { url: "https://youtu.be/K03nXU6tyzM", title: "Fortnite Montage #4", platform: "youtube" },
      { url: "https://youtu.be/eXyQVVTiPL8", title: "Valorant Montage #1", platform: "youtube" },
      { url: "https://youtu.be/ap9fCpgjWU4", title: "Fortnite Montage #5", platform: "youtube" },
      { url: "https://youtu.be/GinSzkA6Tto", title: "Fortnite Montage #6", platform: "youtube" },
      { url: "https://youtu.be/-pQRkJcnnzY", title: "Valorant Montage #2", platform: "youtube" },
      { url: "https://youtu.be/IOMUNvtElZs", title: "Fortnite Montage #7", platform: "youtube" },
      { url: "https://youtu.be/ZADtV3n1csI", title: "Fortnite Montage #8", platform: "youtube" },
      { url: "https://youtu.be/d6h1g_JD1qI", title: "Fortnite Montage #9", platform: "youtube" },
      { url: "https://youtu.be/ffhmPIJhlUo", title: "Fortnite Montage #10", platform: "youtube" },
      { url: "https://youtu.be/1SkwQJkeh3k", title: "Fortnite Montage #11", platform: "youtube" },
      { url: "https://youtu.be/NQBsaXT5GY0", title: "Fortnite Montage #12", platform: "youtube" },
      { url: "https://youtu.be/B6it9YNcYfA", title: "Fortnite Montage #13", platform: "youtube" },
      { url: "https://youtu.be/YYIDx3enYYo", title: "Fortnite Montage #14", platform: "youtube" },
      { url: "https://youtu.be/aLHPwAPrL0Q", title: "Fortnite Montage #15", platform: "youtube" },
      { url: "https://youtu.be/E6tkBpRIIR4", title: "Fortnite Montage #16", platform: "youtube" },
      { url: "https://youtu.be/kEzVLtX5lBM", title: "Valorant Montage #3", platform: "youtube" },
      { url: "https://youtu.be/aEHdBm_yR4U", title: "Fortnite Montage #17", platform: "youtube" },
      { url: "https://youtu.be/Msvn4H9c-2E", title: "Fortnite Montage #18", platform: "youtube" },
      { url: "https://youtu.be/nHa1XuR2g5E", title: "Fortnite Editing Commissions Promo Vid", platform: "youtube" },
    ],
  },
  {
    name: "UCR AAG",
    slug: "ucr-aag",
    videos: [
      { url: "https://youtu.be/lomIX5JOoIc", title: "Intro Animation | AAG", platform: "youtube" },
      { url: "https://youtu.be/RIvMJtMP9KM", title: "Krispy Kreme Fundraiser | AAG", platform: "youtube" },
      { url: "https://youtu.be/d2lOb3BKTbM", title: "UCLA X UCR Blackout Rager", platform: "youtube" },
      { url: "https://youtu.be/EOAVqcW30mU", title: "Blackout Rager | AAG", platform: "youtube" },
    ],
  },
  {
    name: "MUN",
    slug: "mun",
    videos: [
      { url: "https://youtu.be/bmbWzVXXuCE", title: "Conference Recap Edit", platform: "youtube" },
      { url: "https://youtu.be/hkCuBnXk7mw", title: "Club Rush Recap Edit", platform: "youtube" },
    ],
  },
  {
    name: "VP Campaign",
    slug: "vp-campaign",
    videos: [
      { url: "https://youtu.be/swVVeW4ytpA", title: "Campaign Recap Edit", platform: "youtube" },
      { url: "https://youtu.be/7YqFiCZsUdI", title: "Spirit Day Promo", platform: "youtube" },
      { url: "https://youtu.be/GAXS9klRo04", title: "Intro Animation", platform: "youtube" },
    ],
  },
  {
    name: "Editing Tutorials",
    slug: "tutorials",
    videos: [
      { url: "https://youtu.be/jlzDQhHFFrw", title: "Beatshake Effect | Tutorial", platform: "youtube" },
      { url: "https://youtu.be/8SA4y6Ew4sc", title: "Ripple Shockwave Effect | Tutorial", platform: "youtube" },
      { url: "https://youtu.be/GwXOX0vUKAk", title: "Buildup Effect #1 | Tutorial", platform: "youtube" },
      { url: "https://youtu.be/Y9jFIjoRlpI", title: "Buildup Effect #2 | Tutorial", platform: "youtube" },
    ],
  },
  {
    name: "School Projects",
    slug: "school",
    videos: [
      { url: "https://youtu.be/a09Hm0PsdN4", title: "School Project #1", platform: "youtube" },
      { url: "https://youtu.be/T_cdnTzrhck", title: "School Project #2", platform: "youtube" },
      { url: "https://youtu.be/8XDiAV8teZE", title: "School Project #3", platform: "youtube" },
      { url: "https://youtu.be/AxZeMDCi_hY", title: "School Project #4", platform: "youtube" },
      { url: "https://youtu.be/j8nJjsLA-Fw", title: "School Project #5", platform: "youtube" },
      { url: "https://youtu.be/NYWa_dtWidY", title: "School Project #6", platform: "youtube" },
      { url: "https://youtu.be/IyHZ4ggKEgQ", title: "School Project #7", platform: "youtube" },
      { url: "https://youtu.be/ZJDJxxl41s4", title: "School Project #8", platform: "youtube" },
      { url: "https://youtu.be/sayGTYMwg_w", title: "School Project #9", platform: "youtube" },
      { url: "https://youtu.be/5I4tYkWt5Hc", title: "School Project #10", platform: "youtube" },
      { url: "https://youtu.be/EL2QeZev-w0", title: "School Project #11", platform: "youtube" },
      { url: "https://youtu.be/mMq6mGpHLU8", title: "School Project #12", platform: "youtube" },
    ],
  },
  {
    name: "Random Edits",
    slug: "random",
    videos: [
      { url: "https://youtu.be/BpYLqoXrh2A", title: "Bumblebee Edit", platform: "youtube" },
      { url: "https://youtu.be/uO_g_BNqWzs", title: "Zenitsu AMV", platform: "youtube" },
      { url: "https://youtu.be/wmiglZhLNuA", title: "Demon Slayer AMV", platform: "youtube" },
    ],
  },
];
