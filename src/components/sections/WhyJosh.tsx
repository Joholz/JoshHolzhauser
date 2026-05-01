import { Check, X } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

const comparisons = [
  { label: 'You talk to the person writing the code',           josh: true,  agency: false, freelancer: 'maybe' },
  { label: 'Real deployed products with paying users',         josh: true,  agency: true,  freelancer: 'maybe' },
  { label: 'Ongoing maintenance & improvements',               josh: true,  agency: true,  freelancer: false  },
  { label: 'Works from a rough idea — no formal brief needed', josh: true,  agency: false, freelancer: false  },
  { label: 'Uses AI in the build process — ships faster',      josh: true,  agency: 'maybe', freelancer: 'maybe' },
  { label: 'No agency markup (30–50% overhead)',               josh: true,  agency: false, freelancer: true   },
  { label: 'Full-stack: web, mobile, AI, automation',          josh: true,  agency: true,  freelancer: 'maybe' },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)    return <Check className="w-4 h-4 text-[#10B981] mx-auto" />;
  if (value === false)   return <X     className="w-4 h-4 text-[#EF4444] mx-auto" />;
  return <span className="text-xs text-[#F59E0B] block text-center">Sometimes</span>;
}

export default function WhyJosh() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <p className="text-xs text-[#3B82F6] uppercase tracking-widest font-semibold mb-3">Why Work With Me</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-4">
            The solo dev advantage
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Agencies are great when you need ten people on a problem. This is the case where you don&apos;t.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="overflow-x-auto rounded-2xl border border-[#1E2A3A]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111827] border-b border-[#1E2A3A]">
                  <th className="text-left px-6 py-4 text-[#6B7280] font-medium w-1/2">Feature</th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-[#3B82F6] font-bold text-sm">Josh</span>
                  </th>
                  <th className="px-6 py-4 text-center text-[#6B7280] font-medium">Agency</th>
                  <th className="px-6 py-4 text-center text-[#6B7280] font-medium">Avg Freelancer</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map(({ label, josh, agency, freelancer }, i) => (
                  <tr
                    key={label}
                    className={`border-b border-[#1E2A3A] last:border-0 transition-colors hover:bg-[#111827]/50 ${
                      i % 2 === 0 ? 'bg-[#0A0E1A]' : 'bg-[#0d111d]'
                    }`}
                  >
                    <td className="px-6 py-4 text-[#9CA3AF]">{label}</td>
                    <td className="px-6 py-4"><Cell value={josh} /></td>
                    <td className="px-6 py-4"><Cell value={agency} /></td>
                    <td className="px-6 py-4"><Cell value={freelancer} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
