Quintus.gameEnemy = function(Q){

    var a=0;
  Q.component("allEnemy", {
    added: function() {
      var entity = this.entity;
      entity.on("bump.left, bump.right, bump.bottom", function(collision){
        if(collision.obj.isA("Player") && a!=3){
          collision.obj.p.vy = -200;
          Q.audio.play('jump.mp3');
          a++;
        }
        if(collision.obj.isA("Player") && a==3){
          collision.obj.p.vy =-200;
          Q.audio.play('jump.mp3');
          collision.obj.p.vy =-200;
          Q.audio.play('jump.mp3');
          collision.obj.p.vy =-200;
          Q.audio.play('jump.mp3');
          Q.stageScene("level");
        }

      });
      entity.on("bump.top", function(collision){
        if(collision.obj.isA("Player")){
          collision.obj.p.vy = -100;
          Q.audio.play('kill-enemy.mp3');
          this.destroy();
        }
      });
    }
  });

  Q.Sprite.extend("Ghost", {
    init: function(p){
      this._super(p, {
        vx: -50,
        defaultDirection: "left",
        sheet: "ghost",
      });
      this.add("2d, aiBounce, allEnemy");
    },
    step: function(dt) {
      var dir = this.p.vx / Math.abs(this.p.vx);
      var ground = Q.stage().locate(this.p.x, this.p.y +this.p.h/2 + 1, Q.SPRITE_DEFAULT);
      var nextElement = Q.stage().locate(this.p.x + dir * this.p.w/2 + dir, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
      var nextTile;

      if(nextElement instanceof Q.TileLayer) {
        nextTile = true;
      }

      if(!nextTile && ground) {
        if(this.p.vx > 0) {
          if(this.p.defaultDirection == "right") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        else{
          if(this.p.defaultDirection == "left") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        this.p.vx = -this.p.vx;
      }
    }
  });

  Q.Sprite.extend("Bee", {
    init: function(p) {
      this._super(p, {
        vy: -100,
        rangeY: 40,
        gravity: 0,
        sheet: "bee",
      });
      this.add("2d, allEnemy");

      this.p.initialY = this.p.y;
      this.p.initialVy = this.p.vy;
      this.p.vyDirection = this.p.vy/Math.abs(this.p.vy);

      this.on("bump.top, bump.bottom", function(collision) {
        this.p.vy = -Math.abs(this.p.initialVy) * this.p.vyDirection;
        this.p.vyDirection = this.p.vy/Math.abs(this.p.vy);
      });
    }
  });


  Q.Sprite.extend("Alien", {
    init: function(p) {
      this._super(p, {
        vy: -200,
        vx: -200,
        gravity: 0,
        sheet: "blue-alien",
      });
      this.add("2d, allEnemy");

      this.p.initialY = this.p.y;
      this.p.initialVy = this.p.vy;
      this.p.vyDirection = this.p.vy/Math.abs(this.p.vy);

      this.on("bump.top, bump.bottom", function(collision) {
        this.p.vy = -Math.abs(this.p.initialVy) * this.p.vyDirection;
        this.p.vyDirection = this.p.vy/Math.abs(this.p.vy);

        this.p.initialX = this.p.x;
        this.p.initialVx = this.p.vx;
        this.p.vxDirection = this.p.vx/Math.abs(this.p.vx);

        this.on("bump.left, bump.right", function(collision) {
          this.p.vx = -Math.abs(this.p.initialVx) * this.p.vxDirection;
          this.p.vxDirection = this.p.vx/Math.abs(this.p.vx);
      });
    });
  }
});
}
