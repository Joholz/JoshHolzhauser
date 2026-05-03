import type { Publication, PublicationKind } from '@/data/projects';

const LABELS: Record<PublicationKind, string> = {
  vercel: 'Live Website',
  playstore: 'Google Play',
  github: 'GitHub',
  moodle: 'Moodle',
  website: 'Live Website',
};

function VercelMark() {
  return (
    <svg width="14" height="12" viewBox="0 0 76 65" aria-hidden focusable="false">
      <path fill="currentColor" d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  );
}

function PlayStoreMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M3.609 1.814 13.792 12 3.609 22.186A2 2 0 0 1 3 20.79V3.21a2 2 0 0 1 .609-1.396Zm10.89 10.89 2.583 2.583-12.93 7.353a2 2 0 0 0 .238-.122l10.11-9.815ZM5.198.78l12.93 7.353-2.583 2.582L4.96.96a2 2 0 0 1 .238-.18Zm15.13 8.594 3.066 1.744a1 1 0 0 1 0 1.764l-3.066 1.744-3.193-3.626 3.193-3.626Z"
      />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"
      />
    </svg>
  );
}

function MoodleMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M3 19V8.6c0-2.3 1.5-3.6 3.7-3.6 1.7 0 2.7.6 3.5 1.6.9-1 1.9-1.6 3.6-1.6 2.4 0 4.2 1.4 4.2 3.8V19h-3.5v-9.7c0-.9-.4-1.5-1.4-1.5s-1.5.6-1.5 1.5V19H8.1V9.3c0-.9-.5-1.5-1.5-1.5-.9 0-1.4.6-1.4 1.5V19H3Z"
      />
    </svg>
  );
}

function WebsiteMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

const MARKS: Record<PublicationKind, () => React.ReactElement> = {
  vercel: WebsiteMark,
  playstore: PlayStoreMark,
  github: GitHubMark,
  moodle: MoodleMark,
  website: WebsiteMark,
};

interface Props {
  publications: Publication[];
  className?: string;
  noLink?: boolean; // render as spans (for use inside <a> cards)
}

export function PublicationBadges({ publications, className, noLink }: Props) {
  if (!publications.length) return null;
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ''}`}>
      {publications.map((p, i) => {
        const Mark = MARKS[p.kind];
        const label = p.label ?? LABELS[p.kind];
        const inner = (
          <>
            <span className="text-[#86A8FF]">
              <Mark />
            </span>
            <span className="font-mono">{label}</span>
          </>
        );
        if (noLink) {
          return (
            <span
              key={`${p.kind}-${i}`}
              title={p.href}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#1B1F2A] bg-[#171A22] px-2.5 py-1 text-xs text-[#9CA3AF]"
            >
              {inner}
            </span>
          );
        }
        return (
          <a
            key={`${p.kind}-${i}`}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            title={p.href}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#1B1F2A] bg-[#171A22] px-2.5 py-1 text-xs text-[#9CA3AF] hover:border-[#262B38] hover:text-[#F9FAFB] transition-colors"
          >
            {inner}
          </a>
        );
      })}
    </div>
  );
}
