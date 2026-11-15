import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      <span className="text-xs text-muted-foreground font-medium">Loading WorkSpace...</span>
    </div>
  );
}
