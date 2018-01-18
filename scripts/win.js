
Quintus.gameWin = function(Q){
Q.Sprite.extend("Winner", {

  init: function(p) {
    this._super(p, {
      sheet: "power"
    });
    this.add("2d");
  }
});
}
