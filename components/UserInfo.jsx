"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const router=useRouter()
  const { data: session } = useSession();
  return (
    <div>
      <div className="md:p-8 flex flex-col  md:flex-row gap-5 md:items-center my-4">
        <div>
          <div>
            Name:{" "}
            <span className="sm:text-sm font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email:{" "}
            <span className="sm:text-[15px] font-bold">
              {session?.user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={() =>{ signOut({ redirect: false }).then(() => {
        router.push("/"); // Redirect to the dashboard page after signing out
    });
          }}
          className="bg-red-500 text-white font-bold w-28 px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
