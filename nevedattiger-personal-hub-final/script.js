const introScreen = document.getElementById("introScreen");
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

const wallpaperSources = [
    "assets/wallpaper-web.mp4",
    "nevedattiger-personal-hub-final/assets/wallpaper-web.mp4",
    "/nevedattiger-personal-hub-final/assets/wallpaper-web.mp4",
    "https://cdn.jsdelivr.net/gh/Atruegamingfox/vercelapp@main/nevedattiger-personal-hub-final/assets/wallpaper-web.mp4",
    "https://raw.githubusercontent.com/Atruegamingfox/vercelapp/main/nevedattiger-personal-hub-final/assets/wallpaper-web.mp4"
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

    const promise = song.play();

    if (promise) {
        promise.then(setPlayingUI).catch(setPausedUI);
    }
}

function enterSite(event) {
    if (entered) return;

    entered = true;

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    playMusic();
    startWallpaper();

    if (introScreen) {
        introScreen.classList.add("hidden");

        window.setTimeout(() => {
            introScreen.style.display = "none";
        }, 900);
    }
}

if (introScreen) {
    introScreen.addEventListener("click", enterSite);

    introScreen.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            enterSite(event);
        }
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
}

function startWallpaper() {
    if (!wallpaper || wallpaperIndex >= wallpaperSources.length) {
        return;
    }

    wallpaper.muted = true;
    wallpaper.defaultMuted = true;
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

        if (wallpaperIndex < wallpaperSources.length) {
            startWallpaper();
        }
    });

    wallpaper.addEventListener("loadeddata", () => {
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

    startWallpaper();
}

if (wordmark) {
    wordmark.addEventListener("click", event => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
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

async function updateVisitCounter() {
    if (!visitCount || !counterStatus) return;

    const endpoint =
        "https://counterapi.com/api/nevedattiger-personal-hub/view/total-visits?startNumber=3000";

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Counter unavailable");
        }

        const data = await response.json();
        const count = Number(data.value);

        if (!Number.isFinite(count)) {
            throw new Error("Invalid counter response");
        }

        visitCount.textContent = count.toLocaleString("en-US");
        counterStatus.textContent = "LIVE";
        counterStatus.classList.add("live");
    } catch {
        visitCount.textContent = "3,000+";
        counterStatus.textContent = "OFFLINE";
        counterStatus.classList.remove("live");
    }
}

updateVisitCounter();
