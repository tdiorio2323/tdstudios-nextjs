/**
 * Reusable page header/hero section
 * Provides consistent styling across pages
 *
 * @param {Object} props
 * @param {string} props.label - Small uppercase label above title
 * @param {string} props.title - Main heading
 * @param {string} props.description - Supporting text below title
 * @param {string} props.className - Optional additional classes
 */
export default function PageHeader({
  label,
  title,
  description,
  className = '',
}) {
  return (
    <section className={`relative min-h-[60vh] flex flex-col justify-center px-8 md:px-16 pt-32 pb-20 overflow-hidden ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-charcoal/40 via-black/60 to-black" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {label && (
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-gray mb-6">
            {label}
          </div>
        )}
        <h1 className="font-serif text-[clamp(3rem,7vw,5rem)] leading-[1.1] text-white mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl font-normal text-gray max-w-[650px] leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
