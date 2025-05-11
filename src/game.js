function create(params) {
  const { canvas, rooms } = params;

  const ctx = canvas.getContext('2d');
  let currentRoom;

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
    return Promise.all(
      characters.map((characterWrapper) =>
        characterWrapper.character.loadAssets()
      )
    );
  }

  /* Loop related functions */
  function update() {}

  function paint() {
    currentRoom.paint(ctx);
  }

  function loop() {
    //window.requestAnimationFrame(loop);
    update();
    paint(ctx);
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
        .then(startLoop)
        .catch((error) => {
          console.log('> Error when running the game', error);
          throw error;
        });
    }
  };
}

export default { create };
