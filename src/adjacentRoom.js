diogenes.AdjacentRoom = (function() {

  var constructor = function(id, x, y, width, height) {

    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  diogenes.extend(diogenes.MouseFunctions, constructor.prototype);

  return {
    createAdjacentRoom: function(id, x, y, width, height) {
      return new constructor(id, x, y, width, height);
    }
  };

}());
