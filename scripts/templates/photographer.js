export class PhotographerTemplate {

    #defaultData = {
        'name': 'Name',
        'id': 'ID',
        'city': 'City',
        'country': 'Country',
        'tagline': 'TagLine',
        'price': 'Price',
        'portrait': 'default.png'
    }

    constructor(data) {
        this.data = data;
    }

    getUserData() {
        let userData = {};
        for (let key in this.#defaultData) {
            if (!this.data.hasOwnProperty(key) || this.data[key] === '') {
                userData[key] = this.#defaultData[key];
            } else {
                userData[key] = this.data[key];
            }
        }
        return userData;
    }

    async getUserPicture() {
        const portraitPath = `assets/photographers/${this.getUserData().portrait}`;
        const defaultPath = `assets/photographers/${this.#defaultData.portrait}`;

        return new Promise((resolve) => {
            const img = new Image();
            img.src = portraitPath;
            img.onload = () => resolve(portraitPath);
            img.onerror = () => {
                console.warn(`Failed to load image: ${portraitPath}, using default`);
                resolve(defaultPath);
            };
        });
    }

    async getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute('src', await this.getUserPicture())
        img.setAttribute('alt', `Portrait of ${this.getUserData().name}`);
        img.classList.add('card-img');

        const h2 = document.createElement('h2');
        h2.textContent = this.getUserData().name;
        h2.classList.add('card-title');

        const h3 = document.createElement('h3');
        h3.textContent = `${this.getUserData().city}, ${this.getUserData().country}`;
        h3.classList.add('card-subtitle');

        const p1 = document.createElement('p');
        p1.textContent = this.getUserData().tagline;
        p1.classList.add('card-description');

        const p2 = document.createElement('p');
        p2.textContent = `${this.getUserData().price}€/jour`;
        p2.classList.add('card-price');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);

        return article;
    }
}
