import { IntroAnimation } from "@/components/intro-animation";
import { HomeStorytelling } from "@/components/portfolio/home-storytelling";

export default function RootRedirectPage() {
  return (
    <IntroAnimation>
      <HomeStorytelling />
    </IntroAnimation>
  );
}
