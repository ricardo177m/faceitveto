import { siteConfig } from "@/config/site";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  title: "Player Page - " + siteConfig.title,
  description: siteConfig.description,
};

export default function MatchPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto mt-2">
      <SkeletonTheme baseColor="#24292e" highlightColor="#3f4448">
        {children}
      </SkeletonTheme>
    </div>
  );
}
