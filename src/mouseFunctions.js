diogenes.MouseFunctions = {

  /**
   * Check if the mouse is over a section
   *
   * @param {number} mouseX - The x coordinate of the current mouse position
   * @param {number} mouseY - The y coordinate of the current mouse position
   * @param {number} x - The x coordinate of the top left of the section
   * @param {number} y - The y coordinate of the top left of the section
   * @param {number} width - The width of the section
   * @param {number} height - The height of the section
   * @return {boolean} true if the mouse is over the section, false if the mouse is not over the section
   */
  isMouseOver : function(mouseX, mouseY, x, y, width, height) {
    if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
      return true;
    }

    return false;
  }


};

