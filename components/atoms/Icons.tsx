import {
  SiInstagram,
  SiFacebook,
  SiX,
} from "react-icons/si";
import { Mail } from "lucide-react";

export const socialIconMap: Record<string, React.ReactNode> = {
  instagram: <SiInstagram size={18} />,
  facebook: <SiFacebook size={18} />,
  twitter: <SiX size={18} />,
  mail: <Mail size={18} />,
};
