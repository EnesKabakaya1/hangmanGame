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
        "Öğrenci",
        "Gökyüzü",
        "Deniz",
        "Park",
        "Kış",
        "Yaz",
        "Saat",
        "Renk",
        "Ağaç",
        "Okul",
        "Öğretmen",
        "Ayakkabı",
        "Çanta",
        "Araba",
        "Bisiklet",
        "Sevgi",
        "Mutluluk",
        "Kedi",
        "Köpek",
        "Kuş",
        "Meyve",
        "Sebze",
        "Film",
        "Müzik",
        "Resim",
        "Dans",
        "Spor",
        "Tatil",
        "Meydan",
        "Kahve",
        "Çay",
        "Pasta",
        "Meyhane",
        "Deneme",
        "Roman",
        "Şiir",
        "Anı",
        "Gece",
        "Gündüz",
        "Yıldız",
        "Ay",
        "Güneş",
        "Bulut",
        "Yağmur",
        "Kar",
        "Rüzgar",
        "Doğa",
        "Şehir",
        "Sokak",
        "Ev",
        "Ofis",
        "Mağaza",
        "Alışveriş",
        "Pazar",
        "Kahvaltı",
        "Akşam",
        "Sabah",
        "Gece",
        "Gün",
        "Aydınlık",
        "Karanlık",
        "Hava",
        "Sıcak",
        "Soğuk",
        "Nisan",
        "Ekim",
        "Bahar",
        "Sonbahar",
        "Cevap",
        "Soru",
        "Yemek",
        "İçecek",
        "Oyun",
        "Ders",
        "Sınav",
        "Proje",
        "Başarı",
        "Başarısızlık",
        "Plan",
        "Hedef",
        "Zaman",
        "Geçmiş",
        "Gelecek",
        "Şimdi",
        "Hayal",
        "Gerçek",
        "Uyku",
        "Rüya",
        "Yol",
        "Havaalanı",
        "Tren",
        "Otobüs",
        "Taksi",
        "Uçak",
        "Bisiklet",
        "Yürüyüş"
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
