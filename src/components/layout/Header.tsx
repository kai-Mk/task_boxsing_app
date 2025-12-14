"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const Header = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <header className="h-14 bg-white shadow-md relative z-10 flex items-center justify-end px-4">
        <button
          onClick={() => setShowLogoutDialog(true)}
          aria-label="ログアウト"
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={20} />
        </button>
      </header>

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="ログアウト"
        message="ログアウトしますか？"
        confirmLabel="ログアウト"
        cancelLabel="キャンセル"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
        danger
      />
    </>
  );
};

export default Header;
