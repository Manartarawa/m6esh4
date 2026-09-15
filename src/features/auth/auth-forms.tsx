"use client";

import { useActionState } from "react";
import { signInAction, signUpAction } from "@/app/actions/auth";

export function SignInForm() {
  const [error, action] = useActionState(signInAction, "");

  return (
    <form action={action} className="grid gap-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="text-sm text-muted">Demo accounts use password meshdemo1</p>
      <label className="grid gap-1 text-sm">
        Email
        <input className="input" name="email" type="email" required defaultValue="client@mesh.app" />
      </label>
      <label className="grid gap-1 text-sm">
        Password
        <input className="input" name="password" type="password" required defaultValue="meshdemo1" />
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button className="btn btn-primary" type="submit">
        Continue
      </button>
      <p className="text-sm text-muted">client@mesh.app · creator@mesh.app · admin@mesh.app</p>
    </form>
  );
}

export function SignUpForm() {
  const [error, action] = useActionState(signUpAction, "");

  return (
    <form action={action} className="grid gap-4">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <label className="grid gap-1 text-sm">
        Name
        <input className="input" name="name" required />
      </label>
      <label className="grid gap-1 text-sm">
        Email
        <input className="input" name="email" type="email" required />
      </label>
      <label className="grid gap-1 text-sm">
        Password
        <input className="input" name="password" type="password" minLength={8} required />
      </label>
      <label className="grid gap-1 text-sm">
        Role
        <select className="input" name="role" defaultValue="CLIENT">
          <option value="CLIENT">Client</option>
          <option value="CREATOR">Creator</option>
        </select>
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button className="btn btn-primary" type="submit">
        Join MESH
      </button>
    </form>
  );
}
