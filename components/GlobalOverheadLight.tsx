const GlobalOverheadLight = () => {
  return (
    <div
      className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] z-[-10] pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(179, 149, 102, 0.05), transparent)',
      }}
    />
  );
};

export default GlobalOverheadLight;
