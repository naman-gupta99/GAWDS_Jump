
Quintus.gameJump = function(Q){
Q.Sprite.extend("Jump", {

  init: function(p) {
    this._super(p, {
      sheet: "power"
    });
    this.add("2d");
  }
});
}
