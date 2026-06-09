/* ============================================================================
   PORTFOLIO DATA  ::  THIS IS THE ONLY FILE YOU NEED TO EDIT
   ============================================================================

   HOW TO ADD A NEW VIDEO  (takes ~5 seconds):
     1. Find the category you want below (or add a new one).
     2. Add a line inside its `videos: [ ... ]` list:

            { url: "https://youtu.be/XXXXXXXX", title: "My New Edit" },

     3. Save. Refresh the page. Done. The thumbnail is generated automatically.

   SUPPORTED LINKS:
     • YouTube   ->  https://youtu.be/ID
                     https://www.youtube.com/watch?v=ID
                     https://www.youtube.com/shorts/ID
     • Instagram ->  https://www.instagram.com/p/CODE/
                     https://www.instagram.com/reel/CODE/

   OPTIONAL FIELDS per video:
     platform : "youtube" | "instagram"   (auto-detected, only set to override)
     thumb    : "https://.../image.jpg"    (custom thumbnail image, e.g. for
                                            Instagram reels, since IG does not
                                            expose thumbnails automatically)

   TO ADD A WHOLE NEW CATEGORY: copy one { name, slug, blurb, videos } block.
   ========================================================================== */

const CONFIG = {
  brand:    "suryaavfx",                     // <- your name / handle (change me)
  role:     "Video Editor • Motion Designer • Visual Storyteller",
  tagline:  "I cut high-energy edits that hit harder than the drop.",
  email:    "suryaaram27@gmail.com",         // <- your contact email
  socials: {
    instagram: "https://www.instagram.com/suryaaa.ram/",  // <- your IG profile
    email:     "mailto:suryaaram27@gmail.com",            // <- routes to your inbox
  },

  // Featured video shown at the top of the projects section.
  // `preview` is a muted clip that auto-plays in the card; clicking opens the full video.
  featured: {
    url:         "https://www.youtube.com/watch?v=fhot-LAZfEs",
    preview:     "hero.mp4",
    title:       "MUN New York Trip Recap",
    description: "My most recent edit. A recap of our Model UN trip to New York City, capturing the tour through the city and our run at the National High School Model UN conference.",
  },

  // Hero background video. Plays muted on a seamless loop behind the headline.
  //
  // BEST: a self-hosted clip. Trim the video to just the part you want, drop the
  // file in the project folder, and set `file` below for full resolution, no YouTube
  // UI, no spinner, frame-perfect loop. If `file` is set it's used and `url` ignored.
  // (If your clip is already trimmed to the exact segment, leave start/end at 0.)
  //
  // FALLBACK: a YouTube link via `url` + in/out points (has YouTube's loading chrome).
  heroVideo: {
    file:  "hero.mp4",                                     // self-hosted, full quality
    url:   "https://www.youtube.com/watch?v=fhot-LAZfEs",  // used only when file is ""
    start: 0,                                              // already trimmed -> native loop
    end:   0,
  },
};

const CATEGORIES = [
  {
    name: "UCR AAG",
    slug: "ucr-aag",
    blurb: "Promos, recaps & intro animations for the org.",
    videos: [
      { url: "https://youtu.be/lomIX5JOoIc", title: "Intro Animation | AAG" },
      { url: "https://youtu.be/RIvMJtMP9KM", title: "Krispy Kreme Fundraiser | AAG" },
      { url: "https://youtu.be/d2lOb3BKTbM", title: "UCLA x UCR Blackout Rager" },
      { url: "https://youtu.be/EOAVqcW30mU", title: "Blackout Rager | AAG" },
    ],
  },
  {
    name: "MUN",
    slug: "mun",
    blurb: "Conference recaps & club promo edits.",
    videos: [
      { url: "https://www.youtube.com/watch?v=fhot-LAZfEs", title: "New York Trip Recap" },
      { url: "https://youtu.be/bmbWzVXXuCE", title: "Conference Recap Edit" },
      { url: "https://youtu.be/hkCuBnXk7mw", title: "Club Rush Recap Edit" },
    ],
  },
  {
    name: "VP Campaign",
    slug: "vp-campaign",
    blurb: "Campaign recaps, spirit promos & animated intros.",
    videos: [
      { url: "https://youtu.be/swVVeW4ytpA", title: "Campaign Recap Edit" },
      { url: "https://youtu.be/7YqFiCZsUdI", title: "Spirit Day Promo" },
      { url: "https://youtu.be/GAXS9klRo04", title: "Intro Animation" },
    ],
  },
  {
    name: "Gaming Content",
    slug: "gaming",
    blurb: "Montages, frag movies & hype edits. Beat-synced, fast, loud.",
    videos: [
      { url: "https://youtu.be/RLC16C--KAE", title: "Fortnite Montage #1" },
      { url: "https://youtu.be/SUscw7BTZww", title: "Fortnite Montage #2" },
      { url: "https://youtu.be/Dq630xJATQ4", title: "Fortnite Montage #3" },
      { url: "https://youtu.be/K03nXU6tyzM", title: "Fortnite Montage #4" },
      { url: "https://youtu.be/eXyQVVTiPL8", title: "Valorant Montage #1" },
      { url: "https://youtu.be/ap9fCpgjWU4", title: "Fortnite Montage #5" },
      { url: "https://youtu.be/GinSzkA6Tto", title: "Fortnite Montage #6" },
      { url: "https://youtu.be/-pQRkJcnnzY", title: "Valorant Montage #2" },
      { url: "https://youtu.be/IOMUNvtElZs", title: "Fortnite Montage #7" },
      { url: "https://youtu.be/ZADtV3n1csI", title: "Fortnite Montage #8" },
      { url: "https://youtu.be/d6h1g_JD1qI", title: "Fortnite Montage #9" },
      { url: "https://youtu.be/ffhmPIJhlUo", title: "Fortnite Montage #10" },
      { url: "https://youtu.be/1SkwQJkeh3k", title: "Fortnite Montage #11" },
      { url: "https://youtu.be/NQBsaXT5GY0", title: "Fortnite Montage #12" },
      { url: "https://youtu.be/B6it9YNcYfA", title: "Fortnite Montage #13" },
      { url: "https://youtu.be/YYIDx3enYYo", title: "Fortnite Montage #14" },
      { url: "https://youtu.be/aLHPwAPrL0Q", title: "Fortnite Montage #15" },
      { url: "https://youtu.be/E6tkBpRIIR4", title: "Fortnite Montage #16" },
      { url: "https://youtu.be/kEzVLtX5lBM", title: "Valorant Montage #3" },
      { url: "https://youtu.be/aEHdBm_yR4U", title: "Fortnite Montage #17" },
      { url: "https://youtu.be/Msvn4H9c-2E", title: "Fortnite Montage #18" },
      { url: "https://youtu.be/nHa1XuR2g5E", title: "Fortnite Editing Commissions Promo" },
    ],
  },
  {
    name: "Editing Tutorials",
    slug: "tutorials",
    blurb: "Breaking down effects & techniques, step by step.",
    videos: [
      { url: "https://youtu.be/jlzDQhHFFrw", title: "Beatshake Effect | Tutorial" },
      { url: "https://youtu.be/8SA4y6Ew4sc", title: "Ripple Shockwave Effect | Tutorial" },
      { url: "https://youtu.be/GwXOX0vUKAk", title: "Buildup Effect #1 | Tutorial" },
      { url: "https://youtu.be/Y9jFIjoRlpI", title: "Buildup Effect #2 | Tutorial" },
    ],
  },
  {
    name: "School Projects",
    slug: "school",
    blurb: "Coursework edits & assignment pieces.",
    locked: true,                         // these open the "Video Locked" popup instead of playing
    videos: [
      { url: "https://youtu.be/a09Hm0PsdN4", title: "School Project #1" },
      { url: "https://youtu.be/T_cdnTzrhck", title: "School Project #2" },
      { url: "https://youtu.be/8XDiAV8teZE", title: "School Project #3" },
      { url: "https://youtu.be/AxZeMDCi_hY", title: "School Project #4" },
      { url: "https://youtu.be/j8nJjsLA-Fw", title: "School Project #5" },
      { url: "https://youtu.be/NYWa_dtWidY", title: "School Project #6" },
      { url: "https://youtu.be/IyHZ4ggKEgQ", title: "School Project #7" },
      { url: "https://youtu.be/ZJDJxxl41s4", title: "School Project #8" },
      { url: "https://youtu.be/sayGTYMwg_w", title: "School Project #9" },
      { url: "https://youtu.be/5I4tYkWt5Hc", title: "School Project #10" },
      { url: "https://youtu.be/EL2QeZev-w0", title: "School Project #11" },
      { url: "https://youtu.be/mMq6mGpHLU8", title: "School Project #12" },
    ],
  },
  {
    name: "Random Edits",
    slug: "random",
    blurb: "AMVs, one-offs & passion projects.",
    videos: [
      { url: "https://youtu.be/BpYLqoXrh2A", title: "Bumblebee Edit" },
      { url: "https://youtu.be/uO_g_BNqWzs", title: "Zenitsu AMV" },
      { url: "https://youtu.be/wmiglZhLNuA", title: "Demon Slayer AMV" },
    ],
  },
];
