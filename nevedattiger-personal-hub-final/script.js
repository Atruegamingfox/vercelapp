const introScreen = document.getElementById("introScreen");
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");
const wave = document.getElementById("wave");
const wallpaper = document.getElementById("wallpaper");
const cursorGlow = document.getElementById("cursorGlow");

let entered = false;
let musicStarted = false;

if (wallpaper) {
    wallpaper.muted = true;
    wallpaper.loop = true;
    wallpaper.playsInline = true;

    wallpaper.play().catch(() => {});
}

if (cursorGlow) {
    window.addEventListener("pointermove", function (event) {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
        cursorGlow.style.opacity = "1";
    }, { passive: true });

    document.addEventListener("mouseleave", function () {
        cursorGlow.style.opacity = "0";
    });
}

function setPlayingUI() {
    if (musicButton) {
        musicButton.textContent = "❚❚";
        musicButton.setAttribute("aria-label", "Pause music");
    }

    if (wave) {
        wave.classList.add("playing");
    }

    musicStarted = true;
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

    if (promise && typeof promise.then === "function") {
        promise.then(function () {
            setPlayingUI();
        }).catch(function () {
            setPausedUI();
        });
    }
}

function enterWebsite(event) {
    if (entered) return;

    entered = true;

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (introScreen) {
        introScreen.classList.add("hidden");

        setTimeout(function () {
            introScreen.style.display = "none";
        }, 1000);
    }

    playMusic();
}

if (introScreen) {
    introScreen.addEventListener("pointerdown", enterWebsite);
    introScreen.addEventListener("click", enterWebsite);
    introScreen.addEventListener("touchstart", enterWebsite, { passive: false });
}

if (musicButton) {
    musicButton.addEventListener("click", function (event) {
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
    song.addEventListener("play", function () {
        setPlayingUI();
    });

    song.addEventListener("pause", function () {
        setPausedUI();
    });

    song.addEventListener("error", function () {
        setPausedUI();
    });
}

const socials = document.querySelectorAll(".social");

socials.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
        socials.forEach(function (other) {
            if (other !== card) {
                other.style.opacity = "0.42";
            }
        });
    });

    card.addEventListener("mouseleave", function () {
        socials.forEach(function (other) {
            other.style.opacity = "";
        });
    });
});

const wordmark = document.querySelector(".wordmark");

if (wordmark) {
    wordmark.addEventListener("click", function (event) {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}const introScreen = document.getElementById("introScreen");
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");
const wave = document.getElementById("wave");
const wallpaper = document.getElementById("wallpaper");
const cursorGlow = document.getElementById("cursorGlow");

let entered = false;

if (wallpaper) {
    wallpaper.play().catch(() => {});
}

if (cursorGlow) {
    window.addEventListener("pointermove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
        cursorGlow.style.opacity = "1";
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = "0";
    });
}

function setPlaying() {
    if (musicButton) {
        musicButton.textContent = "❚❚";
        musicButton.setAttribute("aria-label", "Pause music");
    }

    if (wave) {
        wave.classList.add("playing");
    }
}

function setPaused() {
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

    const promise = song.play();

    if (promise && typeof promise.then === "function") {
        promise.then(() => {
            setPlaying();
        }).catch(() => {
            setPaused();
        });
    }
}

function enterWebsite(event) {
    if (entered) return;

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    entered = true;

    if (introScreen) {
        introScreen.classList.add("hidden");

        setTimeout(() => {
            introScreen.style.display = "none";
        }, 1000);
    }

    playMusic();
}

if (introScreen) {
    introScreen.addEventListener("pointerdown", enterWebsite, { once: true });
    introScreen.addEventListener("click", enterWebsite, { once: true });
}

if (musicButton) {
    musicButton.addEventListener("click", (event) => {
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
    song.addEventListener("play", setPlaying);
    song.addEventListener("pause", setPaused);
}

const socials = document.querySelectorAll(".social");

socials.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        socials.forEach((other) => {
            if (other !== card) {
                other.style.opacity = "0.42";
            }
        });
    });

    card.addEventListener("mouseleave", () => {
        socials.forEach((other) => {
            other.style.opacity = "";
        });
    });
});

const wordmark = document.querySelector(".wordmark");

if (wordmark) {
    wordmark.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}/* =========================================================
   ELEMENTS
========================================================= */

const introScreen =
    document.getElementById("introScreen");

const enterButton =
    document.getElementById("introScreen");

const song =
    document.getElementById("song");

const musicButton =
    document.getElementById("musicButton");

const wave =
    document.getElementById("wave");

const wallpaper =
    document.getElementById("wallpaper");

const cursorGlow =
    document.getElementById("cursorGlow");


/* =========================================================
   BACKGROUND WALLPAPER
========================================================= */

wallpaper.play().catch(() => {

    console.log(
        "Background autoplay was blocked."
    );

});


/* =========================================================
   CURSOR GLOW
========================================================= */

window.addEventListener(
    "pointermove",
    (event) => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

        cursorGlow.style.opacity =
            "1";

    },
    {
        passive: true
    }
);


document.addEventListener(
    "mouseleave",
    () => {

        cursorGlow.style.opacity =
            "0";

    }
);


/* =========================================================
   MUSIC UI
========================================================= */

function musicIsPlaying() {

    musicButton.textContent =
        "❚❚";

    musicButton.setAttribute(
        "aria-label",
        "Pause music"
    );

    wave.classList.add(
        "playing"
    );

}


function musicIsPaused() {

    musicButton.textContent =
        "▶";

    musicButton.setAttribute(
        "aria-label",
        "Play music"
    );

    wave.classList.remove(
        "playing"
    );

}


/* =========================================================
   START MUSIC
========================================================= */

async function startMusic() {

    try {

        await song.play();

        musicIsPlaying();

        return true;

    }

    catch (error) {

        console.log(
            "Music playback failed:",
            error
        );

        return false;

    }

}


/* =========================================================
   ENTER WEBSITE
========================================================= */

let entered =
    false;


async function enterWebsite() {

    if (entered) {
        return;
    }

    entered = true;


    /*
       IMPORTANT:

       song.play() is called directly as part of
       the user's click.

       This is what allows the browser to permit
       audible playback after the ENTER interaction.
    */

    await startMusic();


    /*
       Fade the intro away.
    */

    introScreen.classList.add(
        "hidden"
    );


    /*
       Give the browser a moment to finish
       the transition before removing the
       intro from interaction.
    */

    setTimeout(
        () => {

            introScreen.style.display =
                "none";

        },
        1100
    );

}


/* =========================================================
   CLICK ANYWHERE ON INTRO
========================================================= */

introScreen.addEventListener(
    "click",
    enterWebsite
);


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener(
    "click",
    async (event) => {

        event.stopPropagation();


        if (song.paused) {

            await startMusic();

        }

        else {

            song.pause();

            musicIsPaused();

        }

    }
);


/* =========================================================
   AUDIO EVENTS
========================================================= */

song.addEventListener(
    "play",
    () => {

        musicIsPlaying();

    }
);


song.addEventListener(
    "pause",
    () => {

        musicIsPaused();

    }
);


/* =========================================================
   HOME BUTTON
========================================================= */

document
    .querySelector(".wordmark")
    .addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


/* =========================================================
   SOCIAL HOVER DIMMING
========================================================= */

const socials =
    document.querySelectorAll(
        ".social"
    );


socials.forEach(
    (card) => {


        card.addEventListener(
            "mouseenter",
            () => {

                socials.forEach(
                    (other) => {

                        if (
                            other !== card
                        ) {

                            other.style.opacity =
                                ".42";

                        }

                    }
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                socials.forEach(
                    (other) => {

                        other.style.opacity =
                            "";

                    }
                );

            }
        );

    }
);const wallpaper =
    document.getElementById("wallpaper");

const song =
    document.getElementById("song");

const musicButton =
    document.getElementById("musicButton");

const wave =
    document.getElementById("wave");

const cursorGlow =
    document.getElementById("cursorGlow");


/* =====================================
   BACKGROUND VIDEO
===================================== */

wallpaper.play().catch(() => {
    console.log("Wallpaper autoplay was blocked.");
});


/* =====================================
   CURSOR GLOW
===================================== */

window.addEventListener(
    "pointermove",
    (event) => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

        cursorGlow.style.opacity = "1";
    },
    {
        passive: true
    }
);

document.addEventListener(
    "mouseleave",
    () => {

        cursorGlow.style.opacity = "0";

    }
);


/* =====================================
   MUSIC
===================================== */

let musicStarted = false;


function musicPlayingUI() {

    musicStarted = true;

    musicButton.textContent = "❚❚";

    musicButton.setAttribute(
        "aria-label",
        "Pause music"
    );

    wave.classList.add("playing");
}


function musicPausedUI() {

    musicButton.textContent = "▶";

    musicButton.setAttribute(
        "aria-label",
        "Play music"
    );

    wave.classList.remove("playing");
}


/* =====================================
   PLAY
===================================== */

async function startMusic() {

    try {

        await song.play();

        musicPlayingUI();

    }

    catch (error) {

        /*
            The browser blocked audible autoplay.

            This is normal browser security behavior.
            The first interaction with the page will
            attempt playback again.
        */

        console.log(
            "Autoplay blocked:",
            error
        );
    }
}


/* =====================================
   TRY AUTOPLAY IMMEDIATELY
===================================== */

window.addEventListener(
    "load",
    () => {

        startMusic();

    }
);


/* =====================================
   PLAY WHEN USER FIRST INTERACTS
===================================== */

function firstInteraction() {

    if (
        !musicStarted &&
        song.paused
    ) {

        startMusic();

    }

}


document.addEventListener(
    "pointerdown",
    firstInteraction,
    {
        once: true
    }
);

document.addEventListener(
    "keydown",
    firstInteraction,
    {
        once: true
    }
);


/* =====================================
   MUSIC BUTTON
===================================== */

musicButton.addEventListener(
    "click",
    async (event) => {

        event.stopPropagation();

        if (song.paused) {

            await startMusic();

        }

        else {

            song.pause();

        }

    }
);


/* =====================================
   AUDIO EVENTS
===================================== */

song.addEventListener(
    "play",
    () => {

        musicPlayingUI();

    }
);


song.addEventListener(
    "pause",
    () => {

        musicPausedUI();

    }
);
