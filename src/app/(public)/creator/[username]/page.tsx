import { notFound } from "next/navigation";
import Link from "next/link";
import { CreatorCard } from "@/components/ui/creator-card";
import { EmptyState } from "@/components/ui/states";
import { creatorService } from "@/services/creator.service";
import { reviewService } from "@/services/review.service";
import { formatBudget, normalizeBehanceUrl } from "@/lib/utils";

export default async function CreatorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const creator = creatorService.getByUsername(username);
  if (!creator) notFound();
  const reviews = reviewService.listForSubject(creator.user.id);
  const related = creatorService.list({ category: creator.category }).filter((item) => item.user.id !== creator.user.id);

  return (
    <div className="grid gap-8">
      <section className="card p-6 md:p-8">
        <p className="badge">{creator.category}</p>
        <h1 className="mt-3 text-4xl font-semibold">{creator.profile.displayName}</h1>
        <p className="mt-2 text-lg text-muted">{creator.headline}</p>
        <p className="mt-4 max-w-2xl">{creator.profile.bio}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
          <span>{creator.profile.location}</span>
          <span>{creator.availability}</span>
          <span>{formatBudget(creator.hourlyRate)} / hr</span>
          <span>{creator.experienceYears} years</span>
        </div>
        {creator.profile.behanceUrl ? (
          <div className="mt-5">
            <Link
              href={normalizeBehanceUrl(creator.profile.behanceUrl)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary inline-flex"
            >
              View Behance
            </Link>
          </div>
        ) : null}
      </section>
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Portfolio</h2>
        {creator.portfolio.filter((item) => item.isActive !== false).length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {creator.portfolio.filter((item) => item.isActive !== false).map((item) => (
              <article key={item.id} className="card p-5">
                <div className="mb-4 h-40 rounded-2xl bg-surface-muted" />
                  <div className="flex flex-wrap gap-2">
                    {(item.classifications?.length ? item.classifications : [{ category: item.category, confidence: 100 }]).map(
                      (classification) => (
                        <span key={classification.category} className="badge">
                          {classification.category} {classification.confidence}%
                        </span>
                      ),
                    )}
                  </div>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
                  {item.tags?.length ? (
                    <p className="mt-3 text-xs text-muted">{item.tags.map((tag) => `#${tag}`).join(" ")}</p>
                  ) : null}
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No portfolio yet" body="This creator has not published work." />
        )}
      </section>
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Services</h2>
        <div className="flex flex-wrap gap-2">
          {creator.skills.map((skill) => (
            <span key={skill.id} className="badge">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {reviews.length ? (
          <div className="grid gap-3">
            {reviews.map((review) => (
              <article key={review.id} className="card p-5">
                <p className="font-semibold">
                  {review.rating}/5 · {review.authorName}
                </p>
                <p className="mt-2 text-muted">{review.comment}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No reviews yet" body="Completed work will collect reviews here." />
        )}
      </section>
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Related creators</h2>
        {related.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <CreatorCard key={item.user.id} creator={item} />
            ))}
          </div>
        ) : (
          <EmptyState title="No related creators" body="More profiles in this category will appear here." />
        )}
      </section>
    </div>
  );
}
