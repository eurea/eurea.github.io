import type React from 'react';
import { type CSSProperties, useEffect, useId } from 'react';

interface GithubCornerProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: number | string;
  direction?: 'left' | 'right';
  octoColor?: string;
  bannerColor?: string;
  ariaLabel?: string;
  svgStyle?: CSSProperties;
}

const STYLES = `
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  20%, 60% {
    transform: rotate(-25deg);
  }
  40%, 80% {
    transform: rotate(10deg);
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
`;

export const GithubCorner: React.FC<GithubCornerProps> = ({
  href = '/',
  size = 80,
  direction = 'right',
  octoColor = '#fff',
  bannerColor = '#151513',
  ariaLabel = 'Open GitHub project',
  className,
  svgStyle,
  ...otherProps
}) => {
  const styleId = useId();

  useEffect(() => {
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = STYLES;
      document.head.appendChild(style);
    }
  }, [styleId]);

  const mainStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    fill: octoColor,
  };

  let pathBanner: string;
  let pathArm: string;
  let pathBody: string;
  const armStyle: CSSProperties = {};

  if (direction === 'left') {
    pathBanner = 'M250 0L135 115h-15l-12 27L0 250V0z';
    pathArm = 'M122 109c15-9 9-19 9-19-3-7-2-11-2-11 1-7-3-2-3-2-4 5-2 11-2 11 3 10-5 15-9 16';
    pathBody =
      'M135 115s-4 2-5 0l-14-14c-3-2-6-3-8-3 8-11 15-24-2-41-5-5-10-7-16-7-1-2-3-7-12-11 0 0-5 3-7 16-4 2-8 5-12 9s-7 8-9 12c-14 4-17 9-17 9 4 8 9 11 11 11 0 6 2 11 7 16 16 16 30 10 41 2 0 3 1 7 5 11l12 11c1 2-1 6-1 6z';
    mainStyle.left = 0;
    armStyle.transformOrigin = '120px 144px';
  } else {
    pathBanner = 'M0 0l115 115h15l12 27 108 108V0z';
    pathArm = 'M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16';
    pathBody =
      'M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z';
    mainStyle.right = 0;
    armStyle.transformOrigin = '130px 106px';
  }

  const additionalClass = typeof className === 'string' ? ` ${className}` : '';

  return (
    <a
      {...otherProps}
      href={href}
      className={`github-corner${additionalClass}`}
      aria-label={ariaLabel}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 250 250"
        style={{ ...mainStyle, ...svgStyle }}
      >
        <title>Go to GitHub repo</title>
        <path className="octo-banner" d={pathBanner} fill={bannerColor} />
        <path className="octo-arm" d={pathArm} style={armStyle} />
        <path className="octo-body" d={pathBody} />
      </svg>
    </a>
  );
};
