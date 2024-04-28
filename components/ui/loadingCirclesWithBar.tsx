"use client";
import { cn } from "@/lib/utils";
import { CirclesWithBar } from "react-loader-spinner";

interface IProps {
  className?: string;
}

export default function LoadingCirclesWithBar(props: IProps) {
  return (
    <section
      className={cn("flex items-center justify-center", props.className)}
    >
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </section>
  );
}
