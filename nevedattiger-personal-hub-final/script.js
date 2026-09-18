/* =========================================================
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
