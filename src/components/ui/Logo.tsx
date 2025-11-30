interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
  className?: string;
}

export function Logo({ size = 'md', variant = 'full', className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-xl' },
    md: { icon: 'w-10 h-10', text: 'text-2xl' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl' },
    xl: { icon: 'w-20 h-20', text: 'text-5xl' }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Stylized X */}
      <div className={`${sizes[size].icon} relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fef2f2" />
            </linearGradient>
          </defs>
          
          {/* Circular background */}
          <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
          
          {/* Stylized X with athletic/dynamic feel */}
          <path
            d="M25 25 L42 50 L25 75 L35 75 L50 55 L65 75 L75 75 L58 50 L75 25 L65 25 L50 45 L35 25 Z"
            fill="url(#xGradient)"
          />
          
          {/* Small accent lines for dynamic effect */}
          <path
            d="M20 50 L25 50"
            stroke="#fef2f2"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M75 50 L80 50"
            stroke="#fef2f2"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text part */}
      {variant === 'full' && (
        <span className={`${sizes[size].text} font-bold tracking-tight`}>
          <span className="text-red-600">XIM</span>
          <span className="text-gray-800">NASIO</span>
        </span>
      )}
    </div>
  );
}
