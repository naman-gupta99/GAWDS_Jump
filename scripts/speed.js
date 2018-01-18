
Quintus.gameSpeed = function(Q){
Q.Sprite.extend("Speed", {

  init: function(p) {
    this._super(p, {
      sheet: "power"
    });
    this.add("2d");
  }
});
}
