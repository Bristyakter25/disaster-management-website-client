import { useState, useEffect } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handler = (e) => {
      e.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(e);
      setVisible(true); // Show our custom button
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt(); // Show browser install prompt
    const choiceResult = await deferredPrompt.userChoice;
    console.log("User choice:", choiceResult.outcome);

    // Hide button after user choice
    setVisible(false);
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleInstall}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 20px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      Install App
    </button>
  );
};

export default InstallButton;
