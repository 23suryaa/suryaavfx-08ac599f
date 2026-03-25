import { motion } from "framer-motion";
import { Mail, Instagram } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glow-line mb-12" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-bold mb-4"
        >
          Let's <span className="text-primary">Work Together</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-10"
        >
          Have a project in mind? I'd love to hear about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@suryaavfx.com"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-primary text-primary-foreground font-display text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </a>
          <a
            href="https://www.instagram.com/suryaavfx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-border text-foreground font-display text-sm uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
