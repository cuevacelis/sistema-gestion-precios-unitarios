import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <section className="container w-full mx-auto min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="flex flex-col gap-10 md:flex-row">
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
