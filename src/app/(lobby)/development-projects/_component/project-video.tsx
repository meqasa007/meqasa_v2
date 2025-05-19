import { Card } from "@/components/ui/card";
import ContentSection from "@/components/content-section";

// Helper function to convert YouTube URL to embed format
const getYouTubeEmbedUrl = (url: string): string | undefined => {
  if (!url) return undefined;

  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = regExp.exec(url);

  if (match?.[2]?.length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  return undefined;
};

interface ProjectVideoProps {
  videoUrl: string | null;
}

export default function ProjectVideo({ videoUrl }: ProjectVideoProps) {
  return (
    <ContentSection
      title="Project Video"
      description=""
      href=""
      className="pt-14 md:pt-20"
      btnHidden
      aria-label="Project video section"
    >
      <Card
        className="flex h-[250px] overflow-hidden rounded-lg border-orange-300 p-0 lg:h-[400px]"
        role="region"
        aria-label="Project video player"
      >
        {videoUrl ? (
          <div className="grow">
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(videoUrl) ?? ""}
              title="Project Video Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            >
              <p className="text-brand-muted p-4">
                Your browser does not support embedded videos.
              </p>
            </iframe>
          </div>
        ) : (
          <div className="grow flex items-center justify-center bg-gray-50">
            <div className="text-center p-4">
              <p className="text-brand-muted mb-2">Video not available</p>
              <p className="text-sm text-brand-muted">
                Please check back later.
              </p>
            </div>
          </div>
        )}
      </Card>
    </ContentSection>
  );
}
