import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import VideoCard from "./VideoCard";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-bold text-center mb-4"
        >
          Selected <span className="text-primary">Work</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-center mb-16 font-body"
        >
          A collection of projects across different styles and platforms
        </motion.p>

        {portfolioData.map((category) => (
          <div key={category.slug} className="mb-20 last:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground whitespace-nowrap">
                {category.name}
              </h3>
              <div className="flex-1 glow-line" />
              <span className="text-sm text-muted-foreground font-body">
                {category.videos.length} {category.videos.length === 1 ? "project" : "projects"}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.videos.map((video, index) => (
                <VideoCard key={video.url} video={video} index={index} locked={category.slug === "school"} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
