import cn from '@/utils/cn';
import Image from 'next/image';

type IconProps = React.HTMLAttributes<SVGElement>;
type ImageType = {
  [key: string]: {
    src: string;
  };
};

interface ImageIconProps extends IconProps {
  name: string;
  className?: string;
}

const IMAGE: ImageType = {
  ai: {
    src: '/images/ai.png',
  },
  art: {
    src: '/images/art.png',
  },
  biological: {
    src: '/images/biological.png',
  },
  business: {
    src: '/images/business.png',
  },
  cinema: {
    src: '/images/cinema.png',
  },
  electronic: {
    src: '/images/electronic.png',
  },
  engineering: {
    src: '/images/engineering.png',
  },
  etc: {
    src: '/images/etc.png',
  },
  hotel: {
    src: '/images/hotel.png',
  },
  humanities: {
    src: '/images/humanities.png',
  },
  liberalArts: {
    src: '/images/liberalArts.png',
  },
  notification: {
    src: '/images/notification.png',
  },
  science: {
    src: '/images/science.png',
  },
  socialScience: {
    src: '/images/socialScience.png',
  },
  software: {
    src: '/images/software.png',
  },
  studyRoom: {
    src: '/images/studyRoom.png',
  },
};
const Icons = {
  Bell: (props: IconProps) => (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <path d="M20.9792 16.2944L19.8791 13.8361H19.7007V9.34446C19.7007 5.27769 16.4894 2 12.5051 2C8.52075 2 5.3095 5.27769 5.3095 9.34446V13.9575L4.03095 16.2944C3.88228 16.5979 4.29855 16.9317 4.65536 16.9317H20.3548C20.6819 16.9317 21.0982 16.6586 20.9792 16.2944Z" />
          <path d="M10.0967 18.6309H15.3001C15.4785 18.6309 15.6271 18.7826 15.6271 18.9647V19.0861C15.6271 20.6946 14.3486 21.9996 12.7727 21.9996C11.1373 21.9996 9.79932 20.6339 9.79932 18.9647C9.79932 18.7826 9.94799 18.6309 10.1264 18.6309H10.0967Z" />
        </g>
      </g>
    </svg>
  ),
  ImageIcon: ({ name, className = '' }: ImageIconProps) => (
    <div className={cn('relative', className)}>
      <Image src={IMAGE[name].src} alt="icon" fill />
    </div>
  ),
};

export default Icons;
