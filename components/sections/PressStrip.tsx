import LogoMarquee from '@/components/ui/LogoMarquee';
import { pressLogos } from '@/lib/content/home';

/** "As seen on" press-logo strip (matches the live interior pages). */
export default function PressStrip() {
  return (
    <div className="border-y border-cream/10 bg-ink py-8">
      <div className="container-wide">
        <LogoMarquee logos={pressLogos} />
      </div>
    </div>
  );
}
