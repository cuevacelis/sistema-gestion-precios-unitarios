import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck } from "lucide-react";

export function TableSkeletonAuthenticate() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </div>
      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-[100px]" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="flex items-center justify-between">
            <Skeleton className="h-12 w-[80%]" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-8 w-[100px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
