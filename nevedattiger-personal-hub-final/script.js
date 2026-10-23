const introScreen = document.getElementById("introScreen");
const introOrb = document.querySelector(".intro-orb");
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");
const wave = document.getElementById("wave");
const wallpaper = document.getElementById("wallpaper");
const wordmark = document.querySelector(".wordmark");
const socials = document.querySelectorAll(".social");
const visitCount = document.getElementById("visitCount");
const counterStatus = document.getElementById("counterStatus");

let entered = false;
let wallpaperIndex = 0;
let wallpaperFallbackTimer;
let counterStatusTimer;

const wallpaperSources = [
    "https://cdn.jsdelivr.net/gh/Atruegamingfox/vercelapp@main/nevedattiger-personal-hub-final/assets/wallpaper-web.mp4",
    "https://raw.githubusercontent.com/Atruegamingfox/vercelapp/main/nevedattiger-personal-hub-final/assets/wallpaper-web.mp4",
    "assets/wallpaper-web.mp4",
    "/assets/wallpaper-web.mp4",
    "/nevedattiger-personal-hub-final/assets/wallpaper-web.mp4",
    "nevedattiger-personal-hub-final/assets/wallpaper-web.mp4"
];

function setPlayingUI() {
    if (musicButton) {
        musicButton.textContent = "Ⅱ";
        musicButton.setAttribute("aria-label", "Pause music");
    }

    if (wave) {
        wave.classList.add("playing");
    }
}

function setPausedUI() {
    if (musicButton) {
        musicButton.textContent = "▶";
        musicButton.setAttribute("aria-label", "Play music");
    }

    if (wave) {
        wave.classList.remove("playing");
    }
}

function playMusic() {
    if (!song) return;

    song.volume = 1;

    const playPromise = song.play();

    if (playPromise) {
        playPromise.then(setPlayingUI).catch(setPausedUI);
    }
}

function enterSite(event) {
    if (entered) return;

    entered = true;

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    document.body.classList.add("entered");

    playMusic();
    startWallpaper();

    if (introScreen) {
        introScreen.classList.add("hidden");

        window.setTimeout(() => {
            introScreen.style.display = "none";
        }, 950);
    }
}

if (introScreen) {
    introScreen.addEventListener("click", enterSite);

    introScreen.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            enterSite(event);
        }
    });

    introScreen.addEventListener("pointermove", event => {
        if (!introOrb) return;

        const rect = introOrb.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        introOrb.style.setProperty("--spot-x", `${x}%`);
        introOrb.style.setProperty("--spot-y", `${y}%`);
    });
}

if (musicButton) {
    musicButton.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        if (!song) return;

        if (song.paused) {
            playMusic();
        } else {
            song.pause();
        }
    });
}

if (song) {
    song.addEventListener("play", setPlayingUI);
    song.addEventListener("pause", setPausedUI);
    song.addEventListener("ended", setPausedUI);

    song.addEventListener("error", setPausedUI);
}

function loadWallpaper(index) {
    if (!wallpaper || index >= wallpaperSources.length) return;

    wallpaperIndex = index;

    if (wallpaperFallbackTimer) {
        clearTimeout(wallpaperFallbackTimer);
    }

    wallpaper.muted = true;
    wallpaper.defaultMuted = true;
    wallpaper.autoplay = true;
    wallpaper.loop = true;
    wallpaper.playsInline = true;

    wallpaper.src = wallpaperSources[index];
    wallpaper.load();

    const playPromise = wallpaper.play();

    if (playPromise) {
        playPromise.catch(() => {});
    }

    wallpaperFallbackTimer = window.setTimeout(() => {
        if (
            wallpaperIndex === index &&
            wallpaper.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
        ) {
            loadWallpaper(index + 1);
        }
    }, 12000);
}

function startWallpaper() {
    if (!wallpaper) return;

    if (!wallpaper.src || wallpaperIndex >= wallpaperSources.length) {
        loadWallpaper(0);
        return;
    }

    wallpaper.play().catch(() => {});
}

if (wallpaper) {
    wallpaper.addEventListener("error", () => {
        if (wallpaperIndex < wallpaperSources.length - 1) {
            loadWallpaper(wallpaperIndex + 1);
        }
    });

    wallpaper.addEventListener("loadeddata", () => {
        if (wallpaperFallbackTimer) {
            clearTimeout(wallpaperFallbackTimer);
        }

        wallpaper.play().catch(() => {});
    });

    wallpaper.addEventListener("canplay", () => {
        wallpaper.play().catch(() => {});
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && wallpaper.paused) {
            wallpaper.play().catch(() => {});
        }
    });

    loadWallpaper(0);
}

window.addEventListener("pointermove", event => {
    if (!wallpaper || window.innerWidth < 700) return;

    const x = (event.clientX / window.innerWidth - 0.5) * -9;
    const y = (event.clientY / window.innerHeight - 0.5) * -7;

    wallpaper.style.setProperty("--wall-x", `${x}px`);
    wallpaper.style.setProperty("--wall-y", `${y}px`);
}, { passive: true });

socials.forEach(card => {
    card.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 5;
        const rotateX = (0.5 - y) * 5;

        card.style.setProperty("--rx", `${rotateX}deg`);
        card.style.setProperty("--ry", `${rotateY}deg`);
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);

        socials.forEach(other => {
            if (other !== card) {
                other.style.opacity = "0.48";
            }
        });
    });

    card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");

        socials.forEach(other => {
            other.style.opacity = "";
        });
    });

    card.addEventListener("focus", () => {
        socials.forEach(other => {
            if (other !== card) {
                other.style.opacity = "0.55";
            }
        });
    });

    card.addEventListener("blur", () => {
        socials.forEach(other => {
            other.style.opacity = "";
        });
    });
});

if (wordmark) {
    wordmark.addEventListener("click", event => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function checkCounterValue() {
    if (!visitCount || !counterStatus) return;

    const text = visitCount.textContent.trim().replace(/,/g, "");
    const value = Number(text);

    if (text && Number.isFinite(value) && value > 3000) {
        counterStatus.textContent = "LIVE";
        counterStatus.classList.add("live");

        if (counterStatusTimer) {
            clearTimeout(counterStatusTimer);
        }
    }
}

if (visitCount && counterStatus) {
    const counterObserver = new MutationObserver(checkCounterValue);

    counterObserver.observe(visitCount, {
        childList: true,
        characterData: true,
        subtree: true
    });

    checkCounterValue();

    counterStatusTimer = window.setTimeout(() => {
        checkCounterValue();

        if (!counterStatus.classList.contains("live")) {
            counterStatus.textContent = "UNAVAILABLE";
        }
    }, 10000);
}
