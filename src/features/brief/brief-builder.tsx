"use client";

import { useState } from "react";
import { appConfig } from "@/config/app";
import { generateBriefAction, analyzeBriefAction } from "@/app/actions/ai";

export function BriefBuilder() {
  const [brief, setBrief] = useState("");
  const [analysis, setAnalysis] = useState<string>("");

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">AI Brief Builder</h1>
        <p className="mt-2 text-muted">Uses a mock provider until a live AI key is connected.</p>
      </div>
      <form
        className="card grid gap-4 p-6"
        action={async (formData) => {
          const next = await generateBriefAction(formData);
          setBrief(next);
        }}
      >
        <input className="input" name="title" placeholder="Project title" required />
        <select className="input" name="category" defaultValue={appConfig.categories[0]}>
          {appConfig.categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <textarea className="input min-h-24" name="goals" placeholder="Goals" required />
        <textarea className="input min-h-24" name="audience" placeholder="Audience" required />
        <textarea className="input min-h-24" name="constraints" placeholder="Constraints" required />
        <button className="btn btn-primary" type="submit">
          Generate brief
        </button>
      </form>
      {brief ? (
        <section className="card grid gap-4 p-6">
          <h2 className="text-xl font-semibold">Draft brief</h2>
          <pre className="whitespace-pre-wrap text-sm text-muted">{brief}</pre>
          <form
            action={async () => {
              const next = await analyzeBriefAction(brief);
              setAnalysis(next);
            }}
          >
            <button className="btn btn-secondary" type="submit">
              Analyze brief
            </button>
          </form>
          {analysis ? <pre className="whitespace-pre-wrap text-sm text-muted">{analysis}</pre> : null}
        </section>
      ) : null}
    </div>
  );
}
