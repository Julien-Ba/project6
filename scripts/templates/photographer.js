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
        const userData = this.getUserData();
        const portraitPath = `assets/photographers/${userData.portrait}`;
        const defaultPath = 'assets/photographers/default.png';

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
        const h2 = document.createElement('h2');
        h2.textContent = this.getUserData().name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
}
