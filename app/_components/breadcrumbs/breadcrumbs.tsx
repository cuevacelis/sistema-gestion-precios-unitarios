import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-row items-center text-sm">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              "flex flex-row items-center",
              breadcrumb.active ? "" : "opacity-50"
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <ChevronRightIcon className="w-3 mx-1 inline-block" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
