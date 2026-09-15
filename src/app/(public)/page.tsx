import Link from "next/link";
import { appConfig } from "@/config/app";
import { creatorService } from "@/services/creator.service";
import { projectService } from "@/services/project.service";
import { CreatorCard } from "@/components/ui/creator-card";
import { ProjectCard } from "@/components/ui/project-card";
import { behanceService } from "@/services/behance.service";

export default function HomePage() {
  const featured = creatorService.featured();
  const openProjects = projectService.list().filter((project) => project.status === "OPEN");
  const behanceProjects = behanceService.listSyncedProjects();
  const featuredProjects = behanceService.listFeaturedProjects();
  const exploreProjects = behanceProjects.filter((project) => !project.isFeatured);

  return (
    <div className="grid gap-12">
      <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="badge">Creative marketplace</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            {appConfig.tagline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{appConfig.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/sign-up" className="btn btn-primary">
              Post a brief
            </Link>
            <Link href="/creators" className="btn btn-secondary">
              Browse creators
            </Link>
          </div>
        </div>
        <div className="card p-5">
          <p className="text-sm text-muted">Categories</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {appConfig.categories.map((category) => (
              <Link key={category} href={`/explore?category=${encodeURIComponent(category)}`} className="badge">
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured creators</h2>
          <Link href="/creators" className="text-sm text-accent">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((creator) => (
            <CreatorCard key={creator.user.id} creator={creator} />
          ))}
        </div>
      </section>
      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Open projects</h2>
          <Link href="/projects" className="text-sm text-accent">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {openProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      {featuredProjects.length ? (
        <section className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Featured projects</p>
              <h2 className="mt-1 text-2xl font-semibold">Selected creative work</h2>
            </div>
            <Link href="/creators" className="text-sm text-accent">
              Meet the creators
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((item) => (
              <article key={item.id} className="card overflow-hidden p-5">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt="" className="mb-4 h-44 w-full rounded-2xl object-cover" />
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <span className="badge">{item.classifications?.[0]?.category ?? "Other"}</span>
                  {item.classifications?.[0]?.subcategory ? (
                    <span className="badge">{item.classifications[0].subcategory}</span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                {item.sourceUrl ? (
                  <Link href={item.sourceUrl} target="_blank" rel="noreferrer" className="btn btn-secondary mt-4">
                    View project
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}
      {exploreProjects.length ? (
        <section className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Explore projects</h2>
            <Link href="/projects" className="text-sm text-accent">View all</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exploreProjects.map((item) => <ProjectCard key={item.id} project={item} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
