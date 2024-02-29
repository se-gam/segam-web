import Image from 'next/image';

interface IconProps extends React.HtmlHTMLAttributes<SVGElement> {
  width: string;
  height: string;
}
type ImageType = {
  [key: string]: {
    src: string;
  };
};

interface ImageIconProps {
  name: string;
  width: number;
  height: number;
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
  grandMother: {
    src: '/images/grandMother.png',
  },
  baby: {
    src: '/images/baby.png',
  },
  child: {
    src: '/images/child.png',
  },
  father: {
    src: '/images/father.png',
  chicken: {
    src: '/images/chicken.png',
  },
  cake: {
    src: '/images/cake.png',
  },
  frenchFries: {
    src: '/images/frenchFries.png',
  },
  hamburger: {
    src: '/images/hamburger.png',
  },
  hotdog: {
    src: '/images/hotdog.png',
  },
  pizza: {
    src: '/images/pizza.png',
  },
  kebab: {
    src: '/images/kebab.png',
  },
  noodle: {
    src: '/images/noodle.png',
  },
  sushi: {
    src: '/images/sushi.png',
  },
};
const Icons = {
  Bell: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g>
        <g>
          <path d="M20.9792 16.2944L19.8791 13.8361H19.7007V9.34446C19.7007 5.27769 16.4894 2 12.5051 2C8.52075 2 5.3095 5.27769 5.3095 9.34446V13.9575L4.03095 16.2944C3.88228 16.5979 4.29855 16.9317 4.65536 16.9317H20.3548C20.6819 16.9317 21.0982 16.6586 20.9792 16.2944Z" />
          <path d="M10.0967 18.6309H15.3001C15.4785 18.6309 15.6271 18.7826 15.6271 18.9647V19.0861C15.6271 20.6946 14.3486 21.9996 12.7727 21.9996C11.1373 21.9996 9.79932 20.6339 9.79932 18.9647C9.79932 18.7826 9.94799 18.6309 10.1264 18.6309H10.0967Z" />
        </g>
      </g>
    </svg>
  ),
  ArrowRight: (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
    </svg>
  ),
  DashBoard: (props: IconProps) => (
    <svg {...props} viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9143 6.63762L11.9714 1.41933C11.2321 0.860224 10.2357 0.860224 9.49643 1.41933L2.55357 6.63762C2.03929 7.01035 1.75 7.60052 1.75 8.19068V16.5772C1.75 17.9129 2.875 19 4.25714 19H9.07857V14.6514C9.07857 14.6514 9.175 14.434 9.30357 14.434H12.1643C12.1643 14.434 12.3893 14.5272 12.3893 14.6514V19H17.3714C18.6893 19 19.75 17.975 19.75 16.7015V8.15962C19.75 7.5384 19.4607 6.97929 18.9464 6.60656L18.9143 6.63762Z" />
    </svg>
  ),
  Attendance: (props: IconProps) => (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 0H4C2.9 0 2 0.9 2 2V18C2 19.1 2.9 20 4 20H16C17.1 20 18 19.1 18 18V2C18 0.9 17.1 0 16 0ZM4 2H9V10L6.5 8.5L4 10V2Z" />
    </svg>
  ),
  Studyroom: (props: IconProps) => (
    <svg viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_643_204)">
        <path d="M2.86667 -0.600098C1.87067 -0.600098 1.06667 0.203902 1.06667 1.1975V16.7747C1.06667 17.7683 1.87187 18.5723 2.86667 18.5723H4.06667C5.05907 18.5723 5.86547 17.7683 5.86547 16.7747V1.1975C5.86547 0.203902 5.05907 -0.600098 4.06547 -0.600098H2.86667ZM8.86427 -0.600098C7.87067 -0.600098 7.06427 0.203902 7.06427 1.1975V16.7747C7.06427 17.7683 7.87067 18.5723 8.86427 18.5723H10.0643C11.0579 18.5723 11.8631 17.7683 11.8631 16.7747V1.1975C11.8631 0.205102 11.0579 -0.600098 10.0631 -0.600098H8.86427ZM17.5283 4.3883C17.4734 4.15075 17.3709 3.92682 17.227 3.73008C17.083 3.53334 16.9005 3.3679 16.6907 3.24379C16.4809 3.11968 16.248 3.03949 16.0062 3.00809C15.7645 2.97669 15.5189 2.99472 15.2843 3.0611L14.3903 3.3131C13.9535 3.43659 13.5796 3.72072 13.3437 4.10846C13.1077 4.4962 13.0272 4.95885 13.1183 5.4035L15.5219 17.1623C15.571 17.4006 15.6679 17.6265 15.8068 17.8264C15.9457 18.0262 16.1236 18.1958 16.3299 18.3249C16.5361 18.454 16.7665 18.5399 17.0069 18.5775C17.2473 18.6151 17.4928 18.6035 17.7287 18.5435L18.9107 18.2435C19.8587 18.0035 20.4395 17.0507 20.2211 16.0991L17.5283 4.3883Z" />
      </g>
      <defs>
        <clipPath>
          <rect width={20} height={20} transform="translate(0.666676)" />
        </clipPath>
      </defs>
    </svg>
  ),
  Mypage: (props: IconProps) => (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 5C6 3.93913 6.42143 2.92172 7.17157 2.17157C7.92172 1.42143 8.93913 1 10 1C11.0609 1 12.0783 1.42143 12.8284 2.17157C13.5786 2.92172 14 3.93913 14 5C14 6.06087 13.5786 7.07828 12.8284 7.82843C12.0783 8.57857 11.0609 9 10 9C8.93913 9 7.92172 8.57857 7.17157 7.82843C6.42143 7.07828 6 6.06087 6 5ZM6 11C4.67392 11 3.40215 11.5268 2.46447 12.4645C1.52678 13.4021 1 14.6739 1 16C1 16.7956 1.31607 17.5587 1.87868 18.1213C2.44129 18.6839 3.20435 19 4 19H16C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16C19 14.6739 18.4732 13.4021 17.5355 12.4645C16.5979 11.5268 15.3261 11 14 11H6Z"
      />
    </svg>
  ),
  ImageIcon: ({ name, width, height }: ImageIconProps) => (
    <Image src={IMAGE[name].src} alt="icon" width={width} height={height} />
  ),
};

export default Icons;
