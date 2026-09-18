const introScreen = document.getElementById("introScreen");
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");
const wave = document.getElementById("wave");
const wallpaper = document.getElementById("wallpaper");
const cursorGlow = document.getElementById("cursorGlow");
const socials = document.querySelectorAll(".social");
const wordmark = document.querySelector(".wordmark");

let entered = false;

function setPlayingUI() {
    musicButton.textContent = "❚❚";
    musicButton.setAttribute("aria-label", "Pause music");
    wave.classList.add("playing");
}

function setPausedUI() {
    musicButton.textContent = "▶";
    musicButton.setAttribute("aria-label", "Play music");
    wave.classList.remove("playing");
}

function playMusic() {
    if (!song) return;

    song.volume = 1;

    const promise = song.play();

    if (promise) {
        promise.then(() => {
            setPlayingUI();
        }).catch(() => {
            setPausedUI();
        });
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

    introScreen.classList.add("hidden");

    setTimeout(() => {
        introScreen.style.display = "none";
    }, 950);
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

if (wallpaper) {
    wallpaper.muted = true;
    wallpaper.loop = true;
    wallpaper.playsInline = true;
    wallpaper.play().catch(() => {});
}

if (cursorGlow) {
    window.addEventListener("pointermove", event => {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
        cursorGlow.style.opacity = "1";
    }, { passive: true });

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
