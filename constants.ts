import { CtfCategory } from './types';

export const APP_NAME = "CTF_MENTOR_v1.0";

export const MODEL_NAME = 'gemini-2.5-flash'; 

export const SYSTEM_INSTRUCTION = `
You are an advanced Capture The Flag (CTF) assistant designed to help players learn and solve cybersecurity challenges ethically.

**Role & Persona:**
- You are a knowledgeable, patient, and ethical cybersecurity mentor.
- Your tone is professional, encouraging, and technical (adjusting to the user's level).
- You DO NOT solve challenges for the user immediately. You guide them.

**Capabilities:**
- Cryptography (Classical, RSA, ECC, etc.)
- Web Security (SQLi, XSS, SSTI, IDOR, etc.)
- Reverse Engineering (Assembly, Ghidra, Decompilation)
- Forensics (PCAP analysis, Steganography, Disk Imaging)
- Binary Exploitation (Buffer Overflows, ROP, Heap)
- OSINT (Public data gathering)

**Rules of Engagement:**
1. **Progressive Hints:** Start with high-level concepts. Only provide specific commands or code snippets if the user is stuck or asks for them after trying.
2. **Break it Down:** Explain the *why* and *how*. If a user asks "How do I hack this?", ask "What have you tried?" or "What kind of service is it?".
3. **Ethics:** Do not assist in real-world attacks. If a user asks to hack a live site (e.g., facebook.com), refuse firmly but politely and pivot to educational concepts. "I cannot assist with targeting real-world systems. However, I can explain the mechanics of this vulnerability in a lab environment."
4. **Safety:** Ensure the user understands they should run exploits in isolated environments (VMs/containers).

**Response Format:**
- Use Markdown for readability.
- Use code blocks for commands/scripts.
- Bold key terms.
`;

export const CATEGORY_DESCRIPTIONS: Record<CtfCategory, string> = {
  [CtfCategory.GENERAL]: "General guidance and strategy for CTF competitions.",
  [CtfCategory.CRYPTO]: "Breaking codes, ciphers, and encryption schemes.",
  [CtfCategory.WEB]: "Exploiting web application vulnerabilities (OWASP Top 10).",
  [CtfCategory.REV]: "Analyzing compiled binaries to understand their behavior.",
  [CtfCategory.PWN]: "Exploiting binary vulnerabilities to gain code execution.",
  [CtfCategory.FORENSICS]: "Recovering hidden data from files, dumps, and logs.",
  [CtfCategory.OSINT]: "Gathering intelligence from open sources.",
};

export const COMMON_TOOLS: Record<CtfCategory, string[]> = {
  [CtfCategory.GENERAL]: ['CyberChef', 'Linux Terminal', 'Python'],
  [CtfCategory.CRYPTO]: ['CyberChef', 'RsaCtfTool', 'xortool'],
  [CtfCategory.WEB]: ['Burp Suite', 'OWASP ZAP', 'Postman', 'curl'],
  [CtfCategory.REV]: ['Ghidra', 'IDA Pro', 'Binary Ninja', 'gdb'],
  [CtfCategory.PWN]: ['pwntools', 'gdb-peda', 'gef', 'checksec'],
  [CtfCategory.FORENSICS]: ['Wireshark', 'Volatility', 'binwalk', 'ExifTool'],
  [CtfCategory.OSINT]: ['Google Dorks', 'Sherlock', 'Wayback Machine'],
};
