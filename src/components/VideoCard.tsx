import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoItem, getThumbnail, getEmbedUrl } from "@/data/portfolio";
import { Play, X, Lock } from "lucide-react";

interface VideoCardProps {
  video: VideoItem;
  index: number;
  locked?: boolean;
}

const VideoCard = ({ video, index, locked }: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLocked, setShowLocked] = useState(false);
  const thumbnail = getThumbnail(video);
  const isInstagram = video.platform === "instagram";

  const handleClick = () => {
    if (locked) {
      setShowLocked(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-card">
              <span className="text-muted-foreground text-sm font-display">Instagram</span>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className={`w-14 h-14 rounded-full ${locked ? "bg-muted/90" : "bg-primary/90"} flex items-center justify-center`}>
              {locked ? (
                <Lock className="w-6 h-6 text-muted-foreground" />
              ) : (
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
              )}
            </div>
          </div>

          {/* Platform badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-display uppercase tracking-wider text-foreground">
            {video.platform === "youtube" ? "YouTube" : "Instagram"}
          </div>
        </div>

        <div className="mt-3 px-1">
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {video.title}
          </h3>
          
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className={`rounded-lg overflow-hidden bg-card ${isInstagram ? "max-w-md mx-auto" : ""}`}>
                <div className={isInstagram ? "aspect-[4/5]" : "aspect-video"}>
                  <iframe
                    src={getEmbedUrl(video)}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      {/* Locked modal */}
      <AnimatePresence>
        {showLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setShowLocked(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-sm w-full bg-card border border-border rounded-xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
                <Lock className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-3">Video Locked</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                This video is locked due to risk of self embarrassment, access may be granted upon further request :)
              </p>
              <button
                onClick={() => setShowLocked(false)}
                className="mt-6 px-6 py-2 rounded-full bg-primary text-primary-foreground font-display text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCard;
