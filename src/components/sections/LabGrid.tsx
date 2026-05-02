import type { Project } from '@/data/projects';
import { PublicationBadges } from '@/components/ui/PublicationBadges';
import { Stagger, StaggerItem } from '@/components/ui/FadeIn';

interface Props {
  projects: Project[];
}

export function LabGrid({ projects }: Props) {
  return (
    <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <StaggerItem key={p.id}>
          <div
            id={p.id}
            className="h-full flex flex-col bg-[#101319] border border-[#1B1F2A] hover:border-[#262B38] rounded-2xl p-6 transition-colors"
          >
            <div className="flex items-center justify-between mb-4 gap-2">
              <span
                className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${p.tagColor}18`, color: p.tagColor }}
              >
                {p.tag}
              </span>
              {p.lab?.highlight && (
                <span className="text-xs font-mono text-[#6B7280]">{p.lab.highlight}</span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">{p.title}</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5 flex-1">{p.lab?.blurb}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] bg-[#171A22] border border-[#1B1F2A] text-[#6B7280] px-2 py-0.5 rounded font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

            {p.publications && p.publications.length > 0 && (
              <PublicationBadges publications={p.publications} />
            )}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
