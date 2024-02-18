const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-word-list');
const hangManItems = document.querySelectorAll('.hangman-item');
const hangManPopup = document.querySelector('.hangman-popup');
const hangmanNotification = document.querySelector('.popup-text');
const alreadyGuessedContainer = document.querySelector('.already-guessed-container');
const playAgainBtn = document.querySelector('.popup-button');
const popupCloeButton = document.querySelector('.close');
const wordDescription = document.querySelector('.word-description');

const correctLetters = [];
const wrongLetters = [];
let randomWord = '';

const getRandomWord = () => {
    const turkisWord = [
        { word: "Merhaba", description: "Selamlaşmak için kullanılan bir ifade" },
        { word: "Kitap", description: "Kağıda basılı metinlerin toplandığı yayın" },
        { word: "Bilgisayar", description: "Verileri işleyen elektronik cihaz" },
        { word: "Kalem", description: "Yazı veya çizim yapmak için kullanılan araç" },
        { word: "Ögrenci", description: "Okulda eğitim alan birey" },
        { word: "Gökyüzü", description: "Yer yüzünün atmosferle buluştuğu sınır" },
        { word: "Deniz", description: "Büyük, tuzlu su kütlesi" },
        { word: "Park", description: "Açık hava rekreasyon alanı" },
        { word: "Yaz", description: "Sıcak ayların mevsimi" },
        { word: "Saat", description: "Zamanı ölçen araç" },
        { word: "Renk", description: "Görülebilen ışığın özelliği" },
        { word: "Agaç", description: "Kökleri toprakta olan bitki" },
        { word: "Okul", description: "Eğitim kurumu" },
        { word: "Ogretmen", description: "Eğitim veren kişi" },
        { word: "Ayakkabı", description: "Ayak giyimi" },
        { word: "Canta", description: "Taşınabilir eşya depolama aracı" },
        { word: "Araba", description: "Motorlu kara taşıtı" },
        { word: "Bisiklet", description: "İki tekerlekli pedallı taşıma aracı" },
        { word: "Sevgi", description: "Duygusal bir bağ" },
        { word: "Mutluluk", description: "Memnuniyet ve sevinç durumu" },
        { word: "Kedi", description: "Ev kedisi veya yabani kedi türleri" },
        { word: "Kopek", description: "Evcil veya çiftlik köpekleri" },
        { word: "Kus", description: "Uçabilen kuş türleri" },
        { word: "Meyve", description: "Yenilebilen tatlı ve su içeren bitki ürünü" },
        { word: "Sebze", description: "Yenilebilen bitki yaprakları veya kökleri" },
        { word: "Film", description: "Sinematografik yapıt" },
        { word: "Müzik", description: "Seslerin ritmik bir şekilde düzenlenmesi" },
        { word: "Resim", description: "Sanatsal bir ifade biçimi" },
        { word: "Dans", description: "Ritmik ve estetik bir biçimde yapılan hareketler" },
        { word: "Spor", description: "Fiziksel aktiviteler ve rekabet" },
        { word: "Tatil", description: "Çalışma veya okuldan ara verilen zaman" },
        { word: "Meydan", description: "Açık alan veya meydan" },
        { word: "Kahve", description: "Kavrulmuş ve öğütülmüş kahve çekirdekleri" },
        { word: "Cay", description: "Bitki yapraklarından yapılan içecek" },
        { word: "Pasta", description: "Tatlı hamur işi" },
        { word: "Meyhane", description: "Geleneksel içkilerin servis edildiği yer" },
        { word: "Deneme", description: "Yazarın düşüncelerini ifade ettiği kısa yazı" },
        { word: "Roman", description: "Uzun kurgusal hikaye" },
        { word: "Siir", description: "Duygusal ve estetik bir dil kullanılarak yazılan metin" },
        { word: "Ani", description: "Bireyin yaşadığı olayları anlattığı yazı" },
        { word: "Gece", description: "Gündüzün karşıtı, karanlık zaman dilimi" },
        { word: "Gunduz", description: "Gece karşıtı, aydınlık zaman dilimi" },
        { word: "Yildiz", description: "Gökyüzündeki parlak ışık kaynağı" },
        { word: "Ay", description: "Dünya'nın uydusu" },
        { word: "Gunes", description: "Güneş sistemindeki yıldız" },
        { word: "Bulut", description: "Su damlacıkları veya buz kristallerinden oluşan gökyüzü formasyonu" },
        { word: "Yagmur", description: "Su damlalarının atmosferden düşmesi" },
        { word: "Kar", description: "Soğuk hava koşullarında oluşan kristalize su" },
        { word: "Ruzgar", description: "Hava hareketleri" },
        { word: "Doga", description: "Tabiatın bütün canlıları ve doğal özellikleri" },
    ];

    randomNumber = Math.floor(Math.random() * turkisWord.length);

    randomWord = turkisWord[randomNumber].word.toLowerCase();

    correctLetters.push(randomWord[0], randomWord[2], randomWord[4]);

    wordEl.innerHTML = `${randomWord.split('').map(letter =>
        `<div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
        </div>`).join('')
        }`

    wordDescription.innerText = turkisWord[randomNumber].description;
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
