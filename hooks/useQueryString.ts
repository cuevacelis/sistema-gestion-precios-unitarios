"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function useQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  const getQueryStringValue = useCallback(
    (name: string) => {
      return searchParams.get(name);
    },
    [searchParams]
  );

  return {
    createQueryString,
    deleteQueryString,
    getQueryStringValue,
    searchParams,
  };
}
