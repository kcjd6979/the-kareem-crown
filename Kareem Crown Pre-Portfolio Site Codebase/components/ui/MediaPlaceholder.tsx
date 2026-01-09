
export const VideoPlaceholder = ({ label = "Video Content" }) => {
  return (
    <div className="media-placeholder video-placeholder">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(218, 165, 32, 0.5)" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      <span className="placeholder-label">{label}</span>
      <span className="placeholder-status">[Content in Development]</span>
    </div>
  );
};

export const ImagePlaceholder = ({ label = "Image Content", aspectRatio = "16/9" }) => {
  return (
    <div className="media-placeholder image-placeholder" style={{ aspectRatio }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
      <span className="placeholder-label">{label}</span>
      <span className="placeholder-status">[Coming Soon]</span>
    </div>
  );
};
