const BackgroundGradient = () => {
  return (
    <div
      className="fixed inset-0 z-[-20]"
      style={{
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
      }}
    />
  );
};

export default BackgroundGradient;
