const introScreen = document.getElementById("introScreen");
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");
const wave = document.getElementById("wave");
const wallpaper = document.getElementById("wallpaper");
const cursorGlow = document.getElementById("cursorGlow");
const socials = document.querySelectorAll(".social");
const wordmark = document.querySelector(".wordmark");

let entered = false;

const wallpaperSources = [
    "https://raw.githubusercontent.com/Atruegamingfox/vercelapp/main/nevedattiger-personal-hub-final/assets/wallpaper-web.mp4",
    "https://cdn.jsdelivr.net/gh/Atruegamingfox/vercelapp@main/nevedattiger-personal-hub-final/assets/wallpaper-web.mp4",
    "assets/wallpaper-web.mp4"
];

let wallpaperIndex = 0;

function setPlayingUI() {
    if (!musicButton || !wave) {
        return;
    }

    musicButton.textContent = "❚❚";
    musicButton.setAttribute("aria-label", "Pause music");
    wave.classList.add("playing");
}

function setPausedUI() {
    if (!musicButton || !wave) {
        return;
    }

    musicButton.textContent = "▶";
    musicButton.setAttribute("aria-label", "Play music");
    wave.classList.remove("playing");
}

function playMusic() {
    if (!song) {
        return;
    }

    song.volume = 1;

    const promise = song.play();

    if (promise) {
        promise
            .then(() => {
                setPlayingUI();
            })
            .catch(() => {
                setPausedUI();
            });
    }
}

function enterSite(event) {
    if (entered) {
        return;
    }

    entered = true;

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    playMusic();

    if (introScreen) {
        introScreen.classList.add("hidden");

        setTimeout(() => {
            introScreen.style.display = "none";
        }, 950);
    }
}

if (introScreen) {
    introScreen.addEventListener("click", enterSite);

    introScreen.addEventListener("keydown", event => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            enterSite(event);
        }
    });
}

if (musicButton) {
    musicButton.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        if (!song) {
            return;
        }

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
}

function loadWallpaper() {
    if (
        !wallpaper ||
        wallpaperIndex >= wallpaperSources.length
    ) {
        return;
    }

    wallpaper.muted = true;
    wallpaper.autoplay = true;
    wallpaper.loop = true;
    wallpaper.playsInline = true;

    wallpaper.src = wallpaperSources[wallpaperIndex];
    wallpaper.load();

    const promise = wallpaper.play();

    if (promise) {
        promise.catch(() => {});
    }
}

if (wallpaper) {
    wallpaper.addEventListener("error", () => {
        wallpaperIndex++;
        loadWallpaper();
    });

    wallpaper.addEventListener("loadeddata", () => {
        wallpaper.play().catch(() => {});
    });

    wallpaper.addEventListener("canplay", () => {
        wallpaper.play().catch(() => {});
    });

    wallpaper.addEventListener("loadedmetadata", () => {
        wallpaper.play().catch(() => {});
    });

    loadWallpaper();
}

if (cursorGlow) {
    window.addEventListener(
        "pointermove",
        event => {
            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";
            cursorGlow.style.opacity = "1";
        },
        {
            passive: true
        }
    );

    document.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = "0";
    });
}

socials.forEach(card => {
    card.addEventListener("mouseenter", () => {
        socials.forEach(other => {
            if (other !== card) {
                other.style.opacity = ".42";
            }
        });
    });

    card.addEventListener("mouseleave", () => {
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
