import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services";
import { Eye, EyeOff, KeyRound, UserRound } from "lucide-react";

/** "Terminal Sign In" form, shown on its own page (see pages/LoginPage.tsx) */
export const LoginCard = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [trustStation, setTrustStation] = useState(false);

  const queryClient = useQueryClient();
  const signIn = useMutation({
    mutationFn: () => login(employeeId, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
      navigate("/dashboard");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[520px] flex-col">
      <h1 id="login-title" className="text-center font-display text-4xl text-cream md:text-5xl">
        Terminal Sign In
      </h1>
      <p className="mt-3 text-center text-base text-cream/80">
        Access the inventory dashboard and automated PO pipelines.
      </p>

      <label htmlFor="employee-id" className="mt-12 text-base font-medium text-cream">
        Employee ID Number
      </label>
      <div className="mt-2 flex h-14 items-center gap-3 rounded-xl bg-[#f5f5f5] px-4 focus-within:ring-2 focus-within:ring-cream/70">
        <UserRound className="size-5 shrink-0 text-cherry" />
        <input
          id="employee-id"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="e.g. EMP-94822"
          required
          autoComplete="username"
          className="w-full bg-transparent text-base text-ink outline-none placeholder:text-cherry/70"
        />
      </div>

      <label htmlFor="password" className="mt-6 text-base font-medium text-cream">
        Security Password
      </label>
      <div className="mt-2 flex h-14 items-center gap-3 rounded-xl bg-[#f5f5f5] px-4 focus-within:ring-2 focus-within:ring-cream/70">
        <KeyRound className="size-5 shrink-0 text-cherry" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          required
          autoComplete="current-password"
          className="w-full bg-transparent text-base tracking-wider text-ink outline-none placeholder:text-cherry/70"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="text-cherry"
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>

      <label className="mt-4 flex w-fit cursor-pointer items-center gap-2 text-sm text-cream">
        <input
          type="checkbox"
          checked={trustStation}
          onChange={(e) => setTrustStation(e.target.checked)}
          className="size-4 accent-cream"
        />
        Trust this station
      </label>

      {signIn.isError && (
        <p role="alert" className="mt-6 rounded-md bg-black/25 px-3 py-2 text-center text-sm text-cream">
          {signIn.error.message || "Sign in failed. Check your Employee ID and password."}
        </p>
      )}

      <button
        type="submit"
        disabled={signIn.isPending}
        className="mt-10 h-14 rounded-xl bg-[#3a1512] text-base font-semibold text-cream shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#2c0f0d] disabled:opacity-70"
      >
        {signIn.isPending ? "Authorizing…" : "Authorize & Connect"}
      </button>
    </form>
  );
};