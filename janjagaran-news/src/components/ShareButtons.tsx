import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  url: string;
  title: string;
  onShare: (platform?: string) => void;
  size?: 'sm' | 'lg';
  className?: string;
}

const ShareButtons = ({ 
  url, 
  title, 
  onShare, 
  size = 'sm', 
  className 
}: ShareButtonsProps) => {
  const buttonSize = size === 'lg' ? 'default' : 'sm';
  const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  const shareButtons = [
    {
      platform: 'facebook',
      icon: Facebook,
      label: 'Facebook',
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      platform: 'twitter', 
      icon: Twitter,
      label: 'Twitter',
      color: 'hover:bg-sky-500 hover:text-white'
    },
    {
      platform: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn', 
      color: 'hover:bg-blue-700 hover:text-white'
    },
    {
      platform: 'copy',
      icon: LinkIcon,
      label: 'Copy Link',
      color: 'hover:bg-gray-600 hover:text-white'
    }
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1 text-gray-600 mr-2">
        <Share2 className={iconSize} />
        <span className="text-sm font-medium">Share:</span>
      </div>
      
      <div className="flex items-center gap-1">
        {shareButtons.map(({ platform, icon: Icon, label, color }, index) => (
          <motion.div
            key={platform}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              size={buttonSize}
              onClick={() => onShare(platform)}
              className={cn(
                "transition-all duration-200",
                color,
                size === 'sm' && "h-8 px-2"
              )}
              title={`Share on ${label}`}
            >
              <Icon className={iconSize} />
              {size === 'lg' && (
                <span className="ml-2 hidden sm:inline">{label}</span>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;