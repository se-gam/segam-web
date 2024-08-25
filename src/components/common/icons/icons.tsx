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
  SL: {
    src: '/images/SL.png',
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
  },
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
  bibimbab: {
    src: '/images/bibimbab.png',
  },
  corndog: {
    src: '/images/corndog.png',
  },
  jjigae: {
    src: '/images/jjigae.png',
  },
  kimbab: {
    src: '/images/kimbab.png',
  },
  pudding: {
    src: '/images/pudding.png',
  },
  ramen: {
    src: '/images/ramen.png',
  },
  stick: {
    src: '/images/stick.png',
  },
  tteokguk: {
    src: '/images/tteokguk.png',
  },
  yackgwa: {
    src: '/images/yackgwa.png',
  },
  bell: {
    src: '/images/bell.png',
  },
  graduationHat: {
    src: '/images/graduationHat.png',
  },
  books: {
    src: '/images/books.png',
  },
  announcement: {
    src: '/images/announcement.png',
  },
  alarm: {
    src: '/images/alarm.png',
  },
  lock: {
    src: '/images/lock.png',
  },
  licenseGithub: {
    src: '/images/licenseGithub.png',
  },
  licenseH: {
    src: '/images/licenseH.png',
  },
  hong: {
    src: '/images/hong.png',
  },
  lee: {
    src: '/images/lee.png',
  },
  jung: {
    src: '/images/jung.png',
  },
  kim: {
    src: '/images/kim.png',
  },
  choi: {
    src: '/images/choi.png',
  },
  segam: {
    src: '/images/segam.png',
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
  ArrowDown: (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
      <path d="M1.43996 3.56C1.38176 3.61805 1.33558 3.68702 1.30407 3.76295C1.27257 3.83889 1.25635 3.92029 1.25635 4.0025C1.25635 4.0847 1.27257 4.16611 1.30407 4.24204C1.33558 4.31797 1.38176 4.38694 1.43996 4.445L5.64496 8.65C5.69122 8.69635 5.74617 8.73312 5.80665 8.75821C5.86714 8.7833 5.93198 8.79622 5.99746 8.79622C6.06295 8.79622 6.12779 8.7833 6.18828 8.75821C6.24876 8.73312 6.30371 8.69635 6.34996 8.65L10.555 4.445C10.8 4.2 10.8 3.805 10.555 3.56C10.31 3.315 9.91496 3.315 9.66996 3.56L5.99996 7.23L2.32496 3.555C2.07996 3.315 1.68496 3.315 1.43996 3.56Z" />
    </svg>
  ),
  ArrowLeft: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.88 2.87999C16.7639 2.76358 16.6259 2.67123 16.4741 2.60821C16.3222 2.54519 16.1594 2.51276 15.995 2.51276C15.8306 2.51276 15.6678 2.54519 15.5159 2.60821C15.364 2.67123 15.2261 2.76358 15.11 2.87999L6.69998 11.29C6.60727 11.3825 6.53372 11.4924 6.48354 11.6134C6.43336 11.7343 6.40753 11.864 6.40753 11.995C6.40753 12.126 6.43336 12.2556 6.48354 12.3766C6.53372 12.4976 6.60727 12.6075 6.69998 12.7L15.11 21.11C15.6 21.6 16.39 21.6 16.88 21.11C17.37 20.62 17.37 19.83 16.88 19.34L9.53998 12L16.89 4.64999C17.37 4.15999 17.37 3.36999 16.88 2.87999Z" />
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
    <Image src={IMAGE[name].src} alt="icon" width={width} height={height} priority />
  ),
  Classic: (props: IconProps) => (
    <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.0625 7C10.4106 7 10.7444 7.13828 10.9906 7.38442C11.2367 7.63056 11.375 7.9644 11.375 8.3125V8.75C11.375 10.4746 9.7475 12.25 7 12.25C4.2525 12.25 2.625 10.4746 2.625 8.75V8.3125C2.625 7.9644 2.76328 7.63056 3.00942 7.38442C3.25556 7.13828 3.5894 7 3.9375 7H10.0625ZM7 1.3125C7.63818 1.3125 8.25022 1.56601 8.70148 2.01727C9.15274 2.46853 9.40625 3.08057 9.40625 3.71875C9.40625 4.35693 9.15274 4.96897 8.70148 5.42023C8.25022 5.87149 7.63818 6.125 7 6.125C6.36182 6.125 5.74978 5.87149 5.29852 5.42023C4.84726 4.96897 4.59375 4.35693 4.59375 3.71875C4.59375 3.08057 4.84726 2.46853 5.29852 2.01727C5.74978 1.56601 6.36182 1.3125 7 1.3125Z" />
    </svg>
  ),
};

export default Icons;
