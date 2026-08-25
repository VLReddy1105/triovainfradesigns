import {
  Award,
  Blocks,
  Boxes,
  Building2,
  ClipboardCheck,
  Clock,
  Compass,
  DoorOpen,
  DraftingCompass,
  Gem,
  Handshake,
  HardHat,
  Hammer,
  Key,
  Layers,
  Lightbulb,
  MapPin,
  Mail,
  MessageSquare,
  Package,
  PaintRoller,
  Phone,
  Recycle,
  Ruler,
  ScanSearch,
  ShieldCheck,
  Smile,
  Sofa,
  Sparkles,
  Truck,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * The content layer stores icon *names*, not components, so the objects in
 * `src/data` stay plain and serialisable across the server/client boundary.
 */
export const ICON_REGISTRY = {
  award: Award,
  blocks: Blocks,
  boxes: Boxes,
  building: Building2,
  clipboard: ClipboardCheck,
  clock: Clock,
  compass: Compass,
  door: DoorOpen,
  drafting: DraftingCompass,
  gem: Gem,
  hammer: Hammer,
  handshake: Handshake,
  hardhat: HardHat,
  key: Key,
  layers: Layers,
  lightbulb: Lightbulb,
  mail: Mail,
  mapPin: MapPin,
  message: MessageSquare,
  package: Package,
  paint: PaintRoller,
  phone: Phone,
  recycle: Recycle,
  ruler: Ruler,
  scan: ScanSearch,
  shield: ShieldCheck,
  smile: Smile,
  sofa: Sofa,
  sparkles: Sparkles,
  truck: Truck,
  wallet: Wallet,
  wrench: Wrench,
} satisfies Record<string, LucideIcon>;

interface IconProps {
  name: keyof typeof ICON_REGISTRY;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.6 }: IconProps) {
  const Glyph = ICON_REGISTRY[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
