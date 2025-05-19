import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface LeaseOptionsProps {
  leaseOptions?: string[];
}

function LeaseOptionCard({ option }: { option: string }) {
  // Parse the option string to extract duration and price
  const durationRegex = /(\d+)\s+months/;
  const durationMatch = durationRegex.exec(option);
  const priceRegex = /GH&#8373;\s+([\d,]+)/;
  const priceMatch = priceRegex.exec(option);

  const duration = durationMatch ? durationMatch[1] + " months" : "";
  const price = priceMatch ? priceMatch[1] : "";
  const unit = "month";

  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-4 text-center border border-blue-400/80 bg-gray-50 font-light">
      <div className="mb-1 text-brand-muted">{duration}</div>
      <div className="text-md mb-1 text-brand-accent font-medium">GH₵ {price}</div>
      <div className="text-brand-muted">per {unit}</div>
    </div>
  );
}

// Render lease options component
export default function LeaseOptions({ leaseOptions }: LeaseOptionsProps) {
  return (
    <aside className="pt-14 md:pt-20">
      <Card className="flex w-full flex-col items-start gap-5 rounded-lg border-[#50a3ff] bg-[#d7e9ff] px-6 py-4 text-brand-accent md:flex-row">
        <Badge className="bg-blue-500 text-xs uppercase">
          Available Lease options
        </Badge>
        <div className="grid grow grid-cols-2 w-full md:grid-cols-3 gap-4 md:gap-3">
          {leaseOptions?.map((option, index) => (
            <LeaseOptionCard key={index} option={option} />
          ))}
        </div>
      </Card>
    </aside>
  );
}
