Quintus.gamePlayer = function(Q){

  Q.Sprite.extend("Player", {
    init: function(p) {
      this._super(p, {
        sheet: "player",
        jumpSpeed: -300,
        speed: 100,
      });
      this.add("2d, platformerControls");

          this.on("hit.sprite", function(collision){
            if(collision.obj.isA("Winner")){
              collision.obj.destroy();
              alert("You Won!!!");
              Q.stageScene("level");
            }
          });

          this.on("hit.sprite", function(collision){
            if(collision.obj.isA("Speed")){
              collision.obj.destroy();
              this.p.speed = 200;
            }
          });

          this.on("hit.sprite", function(collision){
            if(collision.obj.isA("Jump")){
              collision.obj.destroy();
              this.p.jumpSpeed = -500;
            }
          });

}
});
}
