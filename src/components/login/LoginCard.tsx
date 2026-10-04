import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services";
import { Eye, EyeOff, KeyRound, UserRound } from "lucide-react";

/** Frosted-glass "Terminal Sign In" card */
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
    <div className="w-full max-w-[880px] rounded-[28px] border border-white/25 bg-[#7a2021]/25 px-6 pt-20 pb-14 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:pt-24 md:pb-16">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-[400px] flex-col">
        <h1 id="login-title" className="text-center font-display text-3xl text-cocoa">
          Terminal Sign In
        </h1>
        <p className="mt-3 text-center text-sm text-cherry">
          Access the inventory dashboard and automated PO pipeline.
        </p>

        <label htmlFor="employee-id" className="mt-12 text-sm text-cocoa">
          Employee ID Number
        </label>
        <div className="mt-2 flex h-[46px] items-center gap-3 rounded-lg bg-[#f5f5f5] px-4">
          <UserRound className="size-4 shrink-0 text-cherry" />
          <input
            id="employee-id"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="e.g. EMP-94822"
            required
            autoComplete="username"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-cherry"
          />
        </div>

        <label htmlFor="password" className="mt-5 text-sm text-cocoa">
          Security Password
        </label>
        <div className="mt-2 flex h-[46px] items-center gap-3 rounded-lg bg-[#f5f5f5] px-4">
          <KeyRound className="size-4 shrink-0 text-cherry" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            autoComplete="current-password"
            className="w-full bg-transparent text-sm tracking-wider text-ink outline-none placeholder:text-cherry"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-cherry"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <label className="flex cursor-pointer items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={trustStation}
              onChange={(e) => setTrustStation(e.target.checked)}
              className="size-3.5 accent-cream"
            />
            Trust this station
          </label>
          <a href="#" className="text-cherry hover:underline">
            Reset PIN
          </a>
        </div>

        {signIn.isError && (
          <p role="alert" className="mt-6 text-center text-xs text-cherry">
            Sign in failed. Check your Employee ID and password.
          </p>
        )}

        <button
          type="submit"
          disabled={signIn.isPending}
          className="mt-12 h-[50px] rounded-xl bg-cocoa text-sm font-semibold text-white transition-colors hover:bg-[#3a1512] disabled:opacity-70"
        >
          {signIn.isPending ? "Authorizing…" : "Authorize & Connect"}
        </button>
      </form>
    </div>
  );
};
