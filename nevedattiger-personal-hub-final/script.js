const wallpaper =
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