import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="cta">
      <div className="absolute pointer-events-none z-0 opacity-40 top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-[45%_55%_35%_65%/_55%_45%_65%_35%] bg-primary/10 blur-2xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 md:p-16 text-center shadow-lg dark:shadow-[0_0_30px_rgba(43,158,220,0.05)] relative overflow-hidden group">
          <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none" />

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 sm:mb-8 transition-transform duration-500 group-hover:scale-105">
            <Sparkles className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-primary mb-3 sm:mb-4 uppercase block">
            GET STARTED TODAY
          </span>

          <h2 className="font-sans text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight text-foreground max-w-3xl mx-auto mb-4 sm:mb-6">
            Your business has the potential. Let&apos;s build the digital brand to match.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6 sm:mb-10">
            Whether you&apos;re launching a new business, improving an existing website, or ready to take your digital marketing seriously, Digital Brand Builder can help you create a stronger online foundation and a clear path toward growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-base font-medium shadow-sm hover:bg-primary/80 motion-safe:hover:-translate-y-px transition-[transform,background-color] duration-300 group"
            >
              Build Your Digital Brand
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <span className="text-[10px] sm:text-xs text-muted-foreground mt-6 sm:mt-8 block">
            Websites · SEO · Performance Marketing · Social Media
          </span>
        </div>
      </div>
    </section>
  );
}
