import Link from 'next/link'

export default function CTA({
  title = "Ready to get started?",
  subtitle = "Let's talk about your project and see how we can help.",
  primaryButtonText = "Start a Project",
  primaryButtonHref = "/contact",
  secondaryButtonText = null,
  secondaryButtonHref = "/work",
  titleEmphasis = null,
  titleEmphasisPosition = "end" // "start" or "end"
}) {
  // Handle title with optional emphasis
  const renderTitle = () => {
    if (!titleEmphasis) {
      return title;
    }

    if (titleEmphasisPosition === "start") {
      return (
        <>
          <em className="italic text-pink">{titleEmphasis}</em> {title}
        </>
      );
    }

    // Default to end position
    const parts = title.split(titleEmphasis);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}<em className="italic text-pink">{titleEmphasis}</em>{parts[1]}
        </>
      );
    }

    return (
      <>
        {title} <em className="italic text-pink">{titleEmphasis}</em>
      </>
    );
  };

  return (
    <section className="relative py-40 px-8 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-charcoal z-0" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="font-serif text-[clamp(3rem,6vw,5rem)] leading-tight mb-6 text-white">
          {renderTitle()}
        </h2>
        <p className="text-xl text-gray mb-12 max-w-xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href={primaryButtonHref}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-pink transition-colors duration-300"
          >
            {primaryButtonText}
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M4 10h12M12 6l4 4-4 4"/>
            </svg>
          </Link>
          {secondaryButtonText && (
            <Link
              href={secondaryButtonHref}
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
