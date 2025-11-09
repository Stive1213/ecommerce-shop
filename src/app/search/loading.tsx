import { Loader } from "@/components/common/Loader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Loader />
    </div>
  );
}
