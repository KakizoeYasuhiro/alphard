const labels = {
  'youtu.be': '映像を見る',
  'youtube.com': '映像を見る',
  'linkco.re': '配信で聴く',
  'open.spotify.com': '配信で聴く',
  'music.apple.com': '配信で聴く',
  'tiget.net': 'チケットを見る',
};

export default function NewsLink({ href }) {
  let label = '詳細を見る';
  try {
    const url = new URL(href);
    if (['https:', 'http:'].includes(url.protocol)) {
      label = labels[url.hostname.toLowerCase().replace(/^www\./, '')] || label;
    }
  } catch {
    // Relative links use the general label.
  }
  return <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>;
}
