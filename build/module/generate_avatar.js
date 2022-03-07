"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_avatar = void 0;
const generate_avatar = () => {
    const random = (Math.random() * 5 | 0);
    const data = [
        'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
        'https://react.semantic-ui.com/images/avatar/large/molly.png',
        'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
        'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
        'https://react.semantic-ui.com/images/avatar/large/matthew.png'
    ];
    const image = data[random];
    return image;
};
exports.generate_avatar = generate_avatar;
