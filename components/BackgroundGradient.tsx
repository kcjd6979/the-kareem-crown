const BackgroundGradient = () => {
  return (
    <div
      className="fixed inset-0 -z-50 h-screen w-screen"
      style={{
        background: `
          radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 40%),
          linear-gradient(to right, #0a0a0a, #1a1a1a, #0a0a0a)
        `,
      }}
    />
  );
};

export default BackgroundGradient;
