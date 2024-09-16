"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButtonHistory() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      const currentPath = window.location.pathname;
      const newPath = currentPath.split("/").slice(0, -1).join("/");
      router.push(newPath);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBack}
      aria-label="Go back"
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
}
