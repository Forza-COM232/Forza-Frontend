import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { icons } from "@/assets/icons";
import { Skeleton } from "@/components/common/Skeleton";
import { useCurrentUser } from "@/hooks/queries";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils";
import { logout } from "@/services";

/** Name + role in the navbar; opens Change password / Logout */
export const UserMenu = () => {
  const { data: user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const signOut = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },
  });

  const item = "block w-full rounded-md px-3 py-1.5 text-left text-xs hover:bg-white/10 disabled:opacity-60";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 text-left text-cream"
      >
        <img src={icons.worker} alt="" className="size-8" />
        <span className="hidden sm:block">
          {user ? (
            <>
              <span className="block text-sm font-semibold leading-tight">{user.name}</span>
              <span className="block text-xs text-cream/70">{user.role}</span>
            </>
          ) : (
            <Skeleton className="h-8 w-24 bg-white/15" />
          )}
        </span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 w-40 rounded-lg border border-white/15 bg-[#5e2522] p-1 text-cream shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
        >
          
          <button
            type="button"
            role="menuitem"
            className={item}
            disabled={signOut.isPending}
            onClick={() => signOut.mutate()}
          >
            {signOut.isPending ? "Logging out…" : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};
