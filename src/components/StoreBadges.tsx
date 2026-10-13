import React from 'react';
import { ExternalLink } from 'lucide-react';

export const AppleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 170 170"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.99-5.99-9.13-10.73-19.86-14.22-32.19-3.48-12.33-5.23-23.78-5.23-34.34 0-16.27 3.91-29.93 11.74-40.97 7.82-11.05 17.79-16.68 29.89-16.89 4.9.11 10.37 1.39 16.42 3.84 6.05 2.45 10.15 3.73 12.31 3.84 1.74-.22 6.09-1.58 13.05-4.08 6.96-2.5 12.61-3.64 16.95-3.41 12.72.65 23.26 5.48 31.62 14.51-11.09 6.74-16.52 16.09-16.31 28.05.22 9.57 3.97 17.61 11.26 24.13 7.28 6.53 16.14 10.22 26.58 11.09-2.39 7.61-5.33 15.01-8.81 22.21zM119.22 31.84c0-7.39 2.66-14.18 7.99-20.38 5.33-6.2 11.96-10.33 19.89-12.39.22 1.3.33 2.5.33 3.59 0 7.39-2.77 14.24-8.31 20.55-5.54 6.3-12.28 10.27-20.22 11.9-.43-1.09-.68-2.18-.68-3.27z" />
  </svg>
);

export const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.37-.34-.61-.83-.61-1.39V3.204c0-.56.24-1.05.61-1.39zm11.597 11.6L4.542 2.75 16.97 9.87l-1.764 3.544zm0-2.828l1.764 3.544 3.447-1.977c.78-.45.78-1.18 0-1.63l-5.211-2.987zm-1.414 1.414L3.792 21.25l11.414-7.25z" />
  </svg>
);

interface StoreBadgesProps {
  appStoreUrl?: string;
  playStoreUrl?: string;
  className?: string;
  variant?: 'compact' | 'full' | 'pill';
  onLinkClick?: (e: React.MouseEvent) => void;
}

export const StoreBadges: React.FC<StoreBadgesProps> = ({
  appStoreUrl,
  playStoreUrl,
  className = '',
  variant = 'compact',
  onLinkClick,
}) => {
  if (!appStoreUrl && !playStoreUrl) return null;

  const handleClick = (e: React.MouseEvent) => {
    if (onLinkClick) {
      onLinkClick(e);
    }
  };

  if (variant === 'pill') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {appStoreUrl && (
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white border-2 border-slate-700 text-xs font-mono font-bold transition-all shadow-sm hover:scale-105 active:scale-95 group"
            title="Download on Apple App Store (iOS)"
          >
            <AppleIcon className="w-3.5 h-3.5" />
            <span>App Store</span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
          </a>
        )}
        {playStoreUrl && (
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-500 text-xs font-mono font-bold transition-all shadow-sm hover:scale-105 active:scale-95 group"
            title="Get it on Google Play Store (Android)"
          >
            <GooglePlayIcon className="w-3.5 h-3.5" />
            <span>Google Play</span>
            <ExternalLink className="w-3 h-3 text-emerald-200 group-hover:text-white transition-colors" />
          </a>
        )}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        {appStoreUrl && (
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white border-2 border-slate-700 transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group"
            title="Download on Apple App Store"
          >
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <AppleIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider leading-none">Download on</div>
              <div className="text-sm font-black font-display text-white leading-tight">Apple App Store</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white ml-1 transition-colors" />
          </a>
        )}
        {playStoreUrl && (
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border-2 border-emerald-500/80 transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group"
            title="Get it on Google Play"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <GooglePlayIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider leading-none">Get it on</div>
              <div className="text-sm font-black font-display text-white leading-tight">Google Play Store</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white ml-1 transition-colors" />
          </a>
        )}
      </div>
    );
  }

  // Compact variant (default)
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {appStoreUrl && (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-mono font-bold transition-all shadow-sm border-2 border-slate-800 hover:border-slate-600 group"
        >
          <AppleIcon className="w-3.5 h-3.5" />
          <span>App Store</span>
          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white" />
        </a>
      )}
      {playStoreUrl && (
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-sm border-2 border-emerald-500 hover:border-emerald-400 group"
        >
          <GooglePlayIcon className="w-3.5 h-3.5" />
          <span>Google Play</span>
          <ExternalLink className="w-3 h-3 text-emerald-200 group-hover:text-white" />
        </a>
      )}
    </div>
  );
};
