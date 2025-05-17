import { loadImage } from './utils/images/load';

function create(params) {
  const { id, width, height, backgroundUrl } = params;
  let { name, items, characters, zIndex } = params;

  items = items || [];
  characters = characters || [];

  const images = {
    background: null
  };

  return {
    getId() {
      return id;
    },

    getName() {
      return name;
    },

    getWidth() {
      return width;
    },

    getHeight() {
      return height;
    },

    getBackgroundUrl() {
      return backgroundUrl;
    },

    getItems() {
      return items;
    },

    getCharacters() {
      return characters;
    },

    getZIndex() {
      return zIndex;
    },

    addItem(item, x, y) {
      items.push({ item, x, y });
    },

    addItems(newItems) {
      items.concat(newItems);
    },

    addCharacter(character, x, y) {
      character.push({ character, x, y });
    },

    addCharacters(newCharacters) {
      characters.concat(newCharacters);
    },

    setName(newName) {
      name = newName;
    },

    setBackground(img) {
      images.background = img;
    },

    setZIndex(newZIndex) {
      zIndex = newZIndex;
    },

    //updateCharacterPosition(character, newPosition) {
    //character.x = newPosition.x;
    //character.y = newPosition.y;
    //},

    update(timestamp) {
      // TODO: Do the same with items
      characters.forEach((character) => {
        character.update(timestamp);
      });
    },

    paint(ctx, x = 0, y = 0) {
      ctx.drawImage(images.background, x, y, width, height);
      items.forEach((itemWrapper) => {
        itemWrapper.item.paintBackground(ctx, itemWrapper.x, itemWrapper.y);
      });
      characters.forEach((character) => {
        character.paint(ctx);
      });
    },

    loadBackground() {
      return loadImage(backgroundUrl).then((background) => {
        images.background = background;
      });
    }
  };
}

export default { create };
