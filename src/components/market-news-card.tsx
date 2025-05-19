import Link from "next/link";

interface MarketNewsCardProps {
  index: number;
  title: string;
  date: string;
  slug?: string; // Optional slug for the blog post
}

const formatIndex = (index: number): string =>
  (index + 1).toString().padStart(2, "0");

/**
 * A card component for representing market news.
 *
 * It displays a title, date and index.
 *
 * @param {MarketNewsCardProps} props - The component props.
 * @param {number} props.index - The index of the news item.
 * @param {string} props.title - The title of the news item.
 * @param {string} props.date - The date the news item was posted.
 * @param {string} [props.slug] - Optional slug for the blog post URL.
 */
export default function MarketNewsCard({
  index,
  title,
  date,
  slug,
}: MarketNewsCardProps) {
  const postUrl = slug ? `/blog/${slug}` : `/blog/20/${index + 2}`;

  return (
    <article className="mt-12 grid grid-cols-[min-content_minmax(0,1fr)] gap-[16px]">
      <p
        className="text-[28px] font-black leading-8 text-brand-muted opacity-50"
        aria-hidden="true"
      >
        {formatIndex(index)}
      </p>
      <div className="space-y-2">
        <Link
          href={postUrl}
          aria-label={`Read more about ${title}`}
          className="line-clamp-2 text-[15px] font-semibold text-brand-accent hover:underline focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
        >
          <h3 className="text-[15px] font-semibold">{title}</h3>
        </Link>
        <time dateTime={date} className="mt-2 block text-xs text-brand-accent">
          {date}
        </time>
      </div>
    </article>
  );
}
