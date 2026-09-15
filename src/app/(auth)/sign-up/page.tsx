import Link from "next/link";
import { SignUpForm } from "@/features/auth/auth-forms";

export default function SignUpPage() {
  return (
    <div className="grid gap-4">
      <SignUpForm />
      <p className="text-sm text-muted">
        Already on MESH? <Link href="/sign-in">Sign in</Link>
      </p>
    </div>
  );
}
