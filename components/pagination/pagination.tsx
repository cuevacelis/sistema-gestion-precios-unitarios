"use client";

import { generatePagination } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex flex-row items-center">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page) => {
          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  return isActive ? (
    <div className="flex h-8 w-8 items-center justify-center text-sm z-10 bg-blue-600 rounded-full">
      {page}
    </div>
  ) : (
    <Link
      href={href}
      className="flex h-8 w-8 items-center justify-center text-sm"
    >
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx("flex flex-row h-5 w-5 items-center justify-center", {
    "pointer-events-none": isDisabled,
    "mr-2 md:mr-4": direction === "left",
    "ml-2 md:ml-4": direction === "right",
  });

  const icon =
    direction === "left" ? (
      <ChevronLeftIcon className="w-4" />
    ) : (
      <ChevronRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
