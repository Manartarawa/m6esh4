import Link from "next/link";
import { SignInForm } from "@/features/auth/auth-forms";

export default function SignInPage() {
  return (
    <div className="grid gap-4">
      <SignInForm />
      <p className="text-sm text-muted">
        New here? <Link href="/sign-up">Create an account</Link>
      </p>
    </div>
  );
}
