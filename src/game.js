function create(params) {
  const { canvas, rooms } = params;

  const ctx = canvas.getContext('2d');

  const fps = 24;
  const foo = 1 / fps;

  let currentRoom;

  let dt = 0;

  /* Assets management functions */
  function loadRoomsBackgrounds() {
    return Promise.all(rooms.map((room) => room.loadBackground()));
  }

  function loadItemsAssets() {
    // Get all the items from all the rooms
    const items = rooms.reduce(
      (previous, current) => previous.concat(current.getItems()),
      []
    );

    // TODO: Try to find something better than 'itemWrapper'
    return Promise.all(
      items.map((itemWrapper) => itemWrapper.item.loadAssets())
    );
  }

  function loadCharactersAssets() {
    // Get all the items from all the rooms
    const characters = rooms.reduce(
      (previous, current) => previous.concat(current.getCharacters()),
      []
    );

    // TODO: Try to find something better than 'characterWrapper'
    return Promise.all(characters.map((character) => character.loadAssets()));
  }

  /* Event listeners */
  function handleEvents() {
    canvas.addEventListener('click', (e) => {
      const currentPlayableCharacter = currentRoom
        .getCharacters()
        .find((character) => character.getPlayable());

      if (currentPlayableCharacter.walkable) {
        currentPlayableCharacter.walkable.walkTo(currentPlayableCharacter, {
          x: e.offsetX,
          y: e.offsetY
        });
      }
    });
  }

  /* Loop related functions */
  function update(timestamp) {
    currentRoom.update(timestamp);
  }

  function paint() {
    currentRoom.paint(ctx);
  }

  function loop(timestamp) {
    if (!dt) {
      dt = timestamp;
    }

    if ((timestamp - dt) / 1000 >= foo) {
      dt = timestamp;
      update(timestamp);
      paint(ctx);
    }

    window.requestAnimationFrame(loop);
  }

  function startLoop() {
    window.requestAnimationFrame(loop);
  }

  return {
    getCanvas() {
      return canvas;
    },

    getRooms() {
      return rooms;
    },

    getCurrentRoom() {
      return currentRoom;
    },

    setCurrentRoom(room) {
      currentRoom = room;
    },

    run() {
      return loadRoomsBackgrounds()
        .then(loadItemsAssets)
        .then(loadCharactersAssets)
        .then(handleEvents)
        .then(startLoop)
        .catch((error) => {
          console.log('> Error when running the game', error);
          throw error;
        });
    }
  };
}

export default { create };
