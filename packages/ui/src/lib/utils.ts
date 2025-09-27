import { GoogleIcon } from '../icons';
import { type ClassValue, clsx } from 'clsx';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BellIcon,
  BriefcaseIcon,
  Building2Icon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  EyeOffIcon,
  FileIcon,
  FolderIcon,
  GlobeIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  InfoIcon,
  LinkIcon,
  LockIcon,
  LogInIcon,
  LogOutIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  MessageSquareIcon,
  MinusIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
  UnlockIcon,
  UploadIcon,
  UserIcon,
  UsersIcon,
  XIcon
} from 'lucide-react';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const icons = {
  google: GoogleIcon,
  user: UserIcon,
  group: UsersIcon,
  organization: Building2Icon,
  project: BriefcaseIcon,
  person: UserIcon,
  home: HomeIcon,
  settings: SettingsIcon,
  search: SearchIcon,
  bell: BellIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  close: XIcon,
  edit: EditIcon,
  trash: TrashIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  upload: UploadIcon,
  download: DownloadIcon,
  file: FileIcon,
  folder: FolderIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  lock: LockIcon,
  unlock: UnlockIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  chevronUp: ChevronUpIcon,
  chevronDown: ChevronDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  star: StarIcon,
  heart: HeartIcon,
  tag: TagIcon,
  mapPin: MapPinIcon,
  globe: GlobeIcon,
  link: LinkIcon,
  menu: MenuIcon,
  moreVertical: MoreVerticalIcon,
  moreHorizontal: MoreHorizontalIcon,
  message: MessageSquareIcon,
  info: InfoIcon,
  help: HelpCircleIcon,
  logout: LogOutIcon,
  login: LogInIcon
};

export function getIcon(icon?: string) {
  return icons[icon as keyof typeof icons] || UserIcon;
}

export function getIconNames() {
  return Object.keys(icons);
}
