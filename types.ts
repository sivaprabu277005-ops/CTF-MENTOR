export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export enum CtfCategory {
  GENERAL = 'General',
  CRYPTO = 'Cryptography',
  WEB = 'Web Security',
  REV = 'Reverse Engineering',
  PWN = 'Binary Exploitation',
  FORENSICS = 'Forensics',
  OSINT = 'OSINT'
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  isError?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  selectedCategory: CtfCategory;
}

export interface ToolTip {
  title: string;
  description: string;
  command?: string;
}