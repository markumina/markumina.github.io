(() => {
  "use strict";

  const manifest = window.CITY_VIEW_MANIFEST;
  const lockScreen = document.querySelector("#lock-screen");
  const loadingScreen = document.querySelector("#loading-screen");
  const viewerScreen = document.querySelector("#viewer-screen");
  const unlockForm = document.querySelector("#unlock-form");
  const passphraseInput = document.querySelector("#passphrase");
  const lockStatus = document.querySelector("#lock-status");
  const loadingDetail = document.querySelector("#loading-detail");
  const progressTrack = document.querySelector(".progress-track");
  const progressBar = document.querySelector("#progress-bar");
  const progressLabel = document.querySelector("#progress-label");
  const photoPosition = document.querySelector("#photo-position");
  const photoDots = document.querySelector("#photo-dots");
  const fullLoading = document.querySelector("#full-loading");
  const fullLoadingText = document.querySelector("#full-loading-text");
  const fullLoadingPercent = document.querySelector("#full-loading-percent");
  const readyMessage = document.querySelector("#ready-message");
  const unlockButton = document.querySelector(".unlock-button");

  let keyMaterial = null;
  let viewer = null;
  let currentIndex = 0;
  let loadToken = 0;
  let currentUrls = [];
  let hideReadyTimer = 0;

  function setScreen(screen) {
    lockScreen.hidden = screen !== "lock";
    loadingScreen.hidden = screen !== "loading";
    viewerScreen.hidden = screen !== "viewer";
  }

  function setProgress(percent, message) {
    const value = Math.max(0, Math.min(100, Math.round(percent)));
    progressBar.style.width = `${value}%`;
    progressTrack.setAttribute("aria-valuenow", String(value));
    progressLabel.textContent = `${message} · ${value}%`;
  }

  async function deriveKey(material, salt) {
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", hash: "SHA-256", salt, iterations: manifest.iterations },
      material,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    );
  }

  async function unpackAndDecrypt(buffer, material) {
    const bytes = new Uint8Array(buffer);
    const signature = new TextDecoder().decode(bytes.slice(0, 4));
    if (signature !== "CV01") throw new Error("Unknown encrypted file format");

    const salt = bytes.slice(4, 20);
    const iv = bytes.slice(20, 32);
    const tag = bytes.slice(32, 48);
    const ciphertext = bytes.slice(48);
    const combined = new Uint8Array(ciphertext.length + tag.length);
    combined.set(ciphertext);
    combined.set(tag, ciphertext.length);

    const fileKey = await deriveKey(material, salt);
    return crypto.subtle.decrypt({ name: "AES-GCM", iv }, fileKey, combined);
  }

  async function requestEncrypted(url, onProgress) {
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) throw new Error(`Could not load ${url}`);

    const total = Number(response.headers.get("content-length")) || 0;
    if (!response.body || !total) {
      const buffer = await response.arrayBuffer();
      onProgress?.(buffer.byteLength, buffer.byteLength);
      return buffer;
    }

    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.byteLength;
      onProgress?.(received, total);
    }

    const output = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      output.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return output.buffer;
  }

  async function unlock(event) {
    event.preventDefault();
    const passphrase = passphraseInput.value;
    if (!passphrase) {
      lockStatus.textContent = "Please enter the password.";
      passphraseInput.focus();
      return;
    }

    lockStatus.textContent = "";
    unlockButton.disabled = true;
    unlockButton.textContent = "Opening...";
    setScreen("loading");
    loadingDetail.textContent = "Getting the first picture ready";
    setProgress(5, "Checking the key");

    try {
      const firstResponse = await requestEncrypted(manifest.photos[0].preview, (received, total) => {
        setProgress(5 + (received / total) * 45, "Loading the first view");
      });
      keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(passphrase),
        "PBKDF2",
        false,
        ["deriveKey"],
      );
      const preview = await unpackAndDecrypt(firstResponse, keyMaterial);
      setProgress(62, "Password accepted");

      const previewUrls = [URL.createObjectURL(new Blob([preview], { type: "image/jpeg" }))];
      for (let index = 1; index < manifest.photos.length; index += 1) {
        loadingDetail.textContent = `Getting picture ${index + 1} of ${manifest.photos.length} ready`;
        const encrypted = await requestEncrypted(manifest.photos[index].preview);
        const decrypted = await unpackAndDecrypt(encrypted, keyMaterial);
        previewUrls.push(URL.createObjectURL(new Blob([decrypted], { type: "image/jpeg" })));
        setProgress(62 + ((index + 1) / manifest.photos.length) * 38, `Preparing picture ${index + 1}`);
      }

      passphraseInput.value = "";
      initializeViewer(previewUrls);
      setScreen("viewer");
      setTimeout(() => viewer.viewport.goHome(true), 0);
      loadFullPhoto(0);
    } catch (error) {
      console.error(error);
      keyMaterial = null;
      setScreen("lock");
      lockStatus.textContent = "That password did not open the view. Please try again.";
      passphraseInput.select();
    } finally {
      unlockButton.disabled = false;
      unlockButton.textContent = "Open City View";
    }
  }

  function initializeViewer(previewUrls) {
    currentUrls = previewUrls;
    viewer = OpenSeadragon({
      id: "photo-viewer",
      tileSources: { type: "image", url: previewUrls[0] },
      showNavigationControl: false,
      animationTime: 0.55,
      blendTime: 0.12,
      maxZoomPixelRatio: 3,
      minZoomImageRatio: 1,
      visibilityRatio: 1,
      constrainDuringPan: true,
      gestureSettingsMouse: { clickToZoom: false, dblClickToZoom: true, scrollToZoom: true },
      gestureSettingsTouch: { pinchToZoom: true, flickEnabled: false, clickToZoom: false, dblClickToZoom: true },
    });

    photoDots.replaceChildren();
    manifest.photos.forEach((photo, index) => {
      const button = document.createElement("button");
      button.className = "photo-dot";
      button.type = "button";
      button.setAttribute("aria-label", `Show picture ${index + 1}: ${photo.label}`);
      button.addEventListener("click", () => showPhoto(index));
      photoDots.append(button);
    });
    updatePosition();
  }

  function updatePosition() {
    photoPosition.textContent = `${currentIndex + 1} of ${manifest.photos.length}`;
    [...photoDots.children].forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === currentIndex));
    });
  }

  function showPhoto(index) {
    currentIndex = (index + manifest.photos.length) % manifest.photos.length;
    updatePosition();
    viewer.open({ type: "image", url: currentUrls[currentIndex] });
    viewer.addOnceHandler("open", () => viewer.viewport.goHome(false));
    loadFullPhoto(currentIndex);
  }

  async function loadFullPhoto(index) {
    const token = ++loadToken;
    const photo = manifest.photos[index];
    fullLoading.hidden = false;
    fullLoading.classList.remove("complete");
    fullLoadingText.textContent = "Loading full detail...";
    fullLoadingPercent.textContent = "0%";

    try {
      const encrypted = await requestEncrypted(photo.full, (received, total) => {
        if (token !== loadToken) return;
        fullLoadingPercent.textContent = `${Math.round((received / total) * 100)}%`;
      });
      const decrypted = await unpackAndDecrypt(encrypted, keyMaterial);
      if (token !== loadToken) return;

      const previousUrl = currentUrls[index];
      const fullUrl = URL.createObjectURL(new Blob([decrypted], { type: "image/jpeg" }));
      currentUrls[index] = fullUrl;
      const center = viewer.viewport.getCenter();
      const zoom = viewer.viewport.getZoom();
      viewer.open({ type: "image", url: fullUrl });
      viewer.addOnceHandler("open", () => {
        viewer.viewport.zoomTo(zoom, center, true);
        viewer.viewport.panTo(center, true);
        if (previousUrl?.startsWith("blob:")) URL.revokeObjectURL(previousUrl);
      });

      fullLoading.classList.add("complete");
      fullLoadingText.textContent = "Full detail ready";
      fullLoadingPercent.textContent = "100%";
      showReadyMessage();
      setTimeout(() => {
        if (token === loadToken) fullLoading.hidden = true;
      }, 1800);
    } catch (error) {
      console.error(error);
      if (token === loadToken) {
        fullLoadingText.textContent = "Full detail could not load";
        fullLoadingPercent.textContent = "";
      }
    }
  }

  function showReadyMessage() {
    clearTimeout(hideReadyTimer);
    readyMessage.classList.add("visible");
    hideReadyTimer = setTimeout(() => readyMessage.classList.remove("visible"), 5000);
  }

  function zoomBy(factor) {
    viewer.viewport.zoomBy(factor).applyConstraints();
  }

  unlockForm.addEventListener("submit", unlock);
  document.querySelector("#previous-button").addEventListener("click", () => showPhoto(currentIndex - 1));
  document.querySelector("#next-button").addEventListener("click", () => showPhoto(currentIndex + 1));
  document.querySelector("#zoom-in-button").addEventListener("click", () => zoomBy(1.5));
  document.querySelector("#zoom-out-button").addEventListener("click", () => zoomBy(0.67));
  document.querySelector("#reset-button").addEventListener("click", () => viewer.viewport.goHome());

  document.addEventListener("keydown", (event) => {
    if (viewerScreen.hidden || !viewer) return;
    if (event.key === "ArrowLeft") showPhoto(currentIndex - 1);
    if (event.key === "ArrowRight") showPhoto(currentIndex + 1);
    if (event.key === "+" || event.key === "=") zoomBy(1.5);
    if (event.key === "-") zoomBy(0.67);
    if (event.key === "0") viewer.viewport.goHome();
  });

  window.addEventListener("pagehide", () => {
    currentUrls.forEach((url) => {
      if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
    });
  });

  if (!manifest || !window.crypto?.subtle || !window.OpenSeadragon) {
    lockStatus.textContent = "This browser cannot open City View. Please try an up-to-date browser.";
    unlockButton.disabled = true;
  }
})();
