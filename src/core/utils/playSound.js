let audioUnlocked = false;

export const unlockAudio = () => {
  if (audioUnlocked) return Promise.resolve();

  return silentAudio
    .play()
    .then(() => {
      audioUnlocked = true;
      console.log("Audio unlocked successfully");
    })
    .catch(() => {
      console.log("Audio unlock failed, will retry on next interaction");
    });
};

export const playSound = (soundPath) => {
  try {
    const audio = new Audio(soundPath);
    audio.volume = 0.5;
    audio.play().catch((error) => {
      console.warn("Could not play sound:", error);
    });
  } catch (error) {
    console.warn("Error creating audio:", error);
  }
};

export default playSound;
