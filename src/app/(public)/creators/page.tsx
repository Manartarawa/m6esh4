import { Marketplace } from "@/features/marketplace/marketplace";
import { creatorService } from "@/services/creator.service";

export default function CreatorsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Creators</h1>
        <p className="mt-2 text-muted">Independent designers, studios, and specialists.</p>
      </div>
      <Marketplace kind="creators" creators={creatorService.list()} />
    </div>
  );
}
