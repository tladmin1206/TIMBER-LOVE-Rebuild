import VideoBg from './VideoBg';
export default function HeroVideo({ videoId, poster }: { videoId: string; poster: string }) {
  return <VideoBg videoId={videoId} poster={poster} overlay="" priority />;
}
