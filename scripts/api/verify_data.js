export class PhotographerData {

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
            }
        });
    }

}

export class MediaData {

    #defaultData = {
        'id': 'media_ID',
        'photographerId': 'photographer_ID',
        'title': 'Title',
        'image': 'default.png',
        'likes': 'likes',
        'date': 'date',
        'price': 'price'
    }

    constructor(data) {
        this.data = data;
    }

    getMediaData() {
        let mediaData = {};
        for (let key in this.#defaultData) {
            if (!this.data.hasOwnProperty(key) || this.data[key] === '') {
                mediaData[key] = this.#defaultData[key];
            } else {
                mediaData[key] = this.data[key];
            }
        }
        return mediaData;
    }

    getMediaType() {
        return this.data.video && this.data.video !== '' ? 'video' : 'image';
    }

    async getMedia() {
        let mediaPath = `assets/media/${this.getMediaData().photographerId}/`;
        const defaultPath = `assets/photographers/${this.#defaultData.image}`;

        if (this.getMediaType() === 'image') {
            mediaPath += this.getMediaData().image;
            return this.loadImage(mediaPath, defaultPath);
        } else {
            mediaPath += this.data.video;
            return this.generateVideoThumbnail(mediaPath, defaultPath);
        }

    }

    loadImage(mediaPath, defaultPath) {
        return new Promise((resolve) => {
            let media = new Image();
            if (this.getMediaType() === 'video') media = new Video();
            media.src = mediaPath;
            media.onload = () => resolve(mediaPath);
            media.onerror = () => {
                console.warn(`Failed to load image: ${mediaPath}, using default`);
                resolve(defaultPath);
            }
        });
    }

    generateVideoThumbnail(mediaPath, defaultPath) {
        return new Promise((resolve) => {
            let video = document.createElement('video');
            video.src = mediaPath;
            video.muted = true;
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
                // Seek to 25% of the video duration
                video.currentTime = video.duration * 0.25;
            };

            video.onseeked = () => {
                let canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

                let thumbnailUrl = canvas.toDataURL();
                resolve(thumbnailUrl);
            };

            video.onerror = () => {
                console.warn(`Failed to load video: ${mediaPath}, using default image`);
                resolve(defaultPath);
            };
        });
    }

}