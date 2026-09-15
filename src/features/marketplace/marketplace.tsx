"use client";

import { useMemo, useState } from "react";
import { CreatorCard } from "@/components/ui/creator-card";
import { ProjectCard } from "@/components/ui/project-card";
import { EmptyState } from "@/components/ui/states";
import { appConfig } from "@/config/app";
import type { Creator, PortfolioItem, Project } from "@/types/domain";

export function Marketplace({
  kind,
  creators = [],
  projects = [],
  portfolioItems = [],
}: {
  kind: "creators" | "projects" | "explore";
  creators?: Creator[];
  projects?: Project[];
  portfolioItems?: PortfolioItem[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filteredCreators = useMemo(
    () =>
      creators.filter((creator) => {
        const q = `${creator.profile.displayName} ${creator.headline} ${creator.category}`.toLowerCase();
        return (!query || q.includes(query.toLowerCase())) && (!category || creator.category === category);
      }),
    [creators, query, category],
  );

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const q = `${project.title} ${project.summary}`.toLowerCase();
        return (!query || q.includes(query.toLowerCase())) && (!category || project.category === category);
      }),
    [projects, query, category],
  );

  const filteredPortfolioItems = useMemo(
    () =>
      portfolioItems.filter((item) => {
        const classification = item.classifications?.[0];
        const haystack = [
          item.title,
          item.description,
          item.category,
          classification?.category,
          classification?.subcategory,
          ...(item.tags ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const categoryMatch = !category || classification?.category === category || item.category === category;
        return (!query || haystack.includes(query.toLowerCase())) && categoryMatch;
      }),
    [portfolioItems, query, category],
  );

  const portfolioCategories = appConfig.portfolioCategories;

  return (
    <div className="grid gap-6">
      <div className="card grid gap-3 p-4 md:grid-cols-[1fr_220px]">
        <input
          className="input"
          placeholder={`Search ${kind}`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select className="input" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All</option>
          {portfolioCategories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Project categories">
        <button type="button" className={category === "" ? "btn btn-primary" : "btn btn-secondary"} onClick={() => setCategory("")}>All</button>
        {portfolioCategories.map((item) => (
          <button key={item} type="button" className={category === item ? "btn btn-primary" : "btn btn-secondary"} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      {kind !== "projects" ? (
        filteredCreators.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCreators.map((creator) => (
              <CreatorCard key={creator.user.id} creator={creator} />
            ))}
          </div>
        ) : kind !== "explore" || !filteredProjects.length ? (
          <EmptyState title="No creators found" body="Try another category or search term." />
        ) : null
      ) : null}
      {kind !== "creators" ? (
        filteredProjects.length || filteredPortfolioItems.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            {filteredPortfolioItems.map((item) => <ProjectCard key={item.id} project={item} />)}
          </div>
        ) : kind === "projects" ? (
          <EmptyState title="No projects found" body="Try another category or search term." />
        ) : null
      ) : null}
    </div>
  );
}
