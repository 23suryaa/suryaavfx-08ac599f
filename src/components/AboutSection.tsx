import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="glow-line mb-12" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-bold mb-6"
        >
          About <span className="text-primary">Me</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          I'm a video editor and motion designer passionate about crafting compelling visual stories.
          From gaming montages to campaign videos, school projects to social media content — I bring
          creativity and precision to every project. My work spans multiple platforms and styles,
          always focused on delivering polished, engaging content that makes an impact.
        </motion.p>
        <div className="glow-line mt-12" />
      </div>
    </section>
  );
};

export default AboutSection;
