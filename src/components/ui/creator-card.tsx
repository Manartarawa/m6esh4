import Link from "next/link";
import { formatBudget } from "@/lib/utils";
import type { Creator } from "@/types/domain";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/creator/${creator.profile.username}`} className="card block p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{creator.category}</p>
          <h3 className="mt-1 text-lg font-semibold">{creator.profile.displayName}</h3>
          <p className="mt-2 text-sm text-muted">{creator.headline}</p>
        </div>
        <span className="badge">{creator.availability}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {creator.styleTags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">
        {creator.profile.location} · {formatBudget(creator.hourlyRate)} / hr
      </p>
    </Link>
  );
}
