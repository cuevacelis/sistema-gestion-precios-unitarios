import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <section className="container max-w-6xl mx-auto min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="space-y-0.5">
        <div className="h-9 w-64 bg-muted rounded animate-pulse" />
        <div className="h-6 w-96 bg-muted rounded animate-pulse" />
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-muted rounded animate-pulse mb-2"
                />
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-3/4">
          <Card>
            <CardContent className="p-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2 mb-4">
                  <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                  <div className="h-10 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
