const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-word-list');
const hangManItems = document.querySelectorAll('.hangman-item');
const hangManPopup = document.querySelector('.hangman-popup');
const hangmanNotification = document.querySelector('.popup-text');
const alreadyGuessedContainer = document.querySelector('.already-guessed-container');
const playAgainBtn = document.querySelector('.popup-button');
const popupCloeButton = document.querySelector('.close');

const correctLetters = [];
const wrongLetters = [];
let randomWord = '';

const getRandomWord = () => {
    const turkisWord = [
        "Merhaba",
        "Kitap",
        "Bilgisayar",
        "Kalem",
        "Ogrenci",
        "Gokyuzu",
        "Deniz",
        "Park",
        "Kiş",
        "Yaz",
        "Saat",
        "Renk",
        "Agac",
        "Okul",
        "Ogretmen",
        "Ayakkabi",
        "Canta",
        "Araba",
        "Bisiklet",
        "Sevgi",
        "Mutluluk",
        "Kedi",
        "Kopek",
        "Kus",
        "Meyve",
        "Sebze",
        "Film",
        "Muzik",
        "Resim",
        "Dans",
        "Spor",
        "Tatil",
        "Meydan",
        "Kahve",
        "Cay",
        "Pasta",
        "Meyhane",
        "Deneme",
        "Roman",
        "Siir",
        "Ani",
        "Gece",
        "Gunduz",
        "Yildiz",
        "Ay",
        "Gunes",
        "Bulut",
        "Yagmur",
        "Kar",
        "Ruzgar",
        "Doğa",
        "Sehir",
        "Sokak",
        "Ev",
        "Ofis",
        "Magaza",
        "Alisveris",
        "Pazar",
        "Kahvalti",
        "Akşam",
        "Sabah",
        "Gece",
        "Gün",
        "Aydinlik",
        "Karanlik",
        "Hava",
        "Sicak",
        "Soguk",
        "Nisan",
        "Ekim",
        "Bahar",
        "Sonbahar",
        "Cevap",
        "Soru",
        "Yemek",
        "Içecek",
        "Oyun",
        "Ders",
        "Sinav",
        "Proje",
        "Başari",
        "Basarisizlik",
        "Plan",
        "Hedef",
        "Zaman",
        "Gecmis",
        "Gelecek",
        "Simdi",
        "Hayal",
        "Gerçek",
        "Uyku",
        "Ruya",
        "Yol",
        "Havaalani",
        "Tren",
        "Otobus",
        "Taksi",
        "Ucak",
        "Bisiklet",
        "Yuruyus"
    ];

    randomWord = turkisWord[Math.floor(Math.random() * turkisWord.length)].toLowerCase();

    correctLetters.push(randomWord[0], randomWord[2], randomWord[4]);

    console.log(randomWord);
    wordEl.innerHTML = `${randomWord.split('').map(letter =>
        `<div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>`).join('')
        }`
};

const displayWord = () => {
    wordEl.innerHTML = `${randomWord.split('').map(letter =>
        `<div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>`).join('')
        }`

    const word = wordEl.innerText.replace(/\n/g, '');

    if (word === randomWord) {
        setTimeout(() => {
            hangManPopup.style.display = 'flex';
            hangmanNotification.innerText = 'You won!';
        }, 500);
    }
};

const updateWrongLettersEl = () => {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    hangManItems.forEach((item, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === hangManItems.length) {
        hangManPopup.style.display = 'flex';
        hangmanNotification.innerText = 'You lost!';
    }
};


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    document.querySelector('.keyboard').appendChild(button);

    button.addEventListener('click', () => {
        const letter = button.innerText;

        if (randomWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                const alreadyGuessed = document.createElement('div');
                alreadyGuessed.classList.add('already-guessed');
                alreadyGuessed.innerText = `You already guessed ${letter}`;

                alreadyGuessedContainer.append(alreadyGuessed);

                setTimeout(() => {
                    alreadyGuessed.remove();
                }, 2000);
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }
        }
    });
}

window.addEventListener('keydown', e => {
    const letter = e.key;

    if (randomWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        } else {
            const alreadyGuessed = document.createElement('div');
            alreadyGuessed.classList.add('already-guessed');
            alreadyGuessed.innerText = `You already guessed ${letter}`;

            alreadyGuessedContainer.append(alreadyGuessed);

            setTimeout(() => {
                alreadyGuessed.remove();
            }, 2000);
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLettersEl();
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    getRandomWord();

    updateWrongLettersEl();

    hangManPopup.style.display = 'none';
});

popupCloeButton.addEventListener('click', () => {
    hangManPopup.style.display = 'none';
});

getRandomWord();
