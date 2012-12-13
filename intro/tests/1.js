var assert = require('chai').assert;

function Point(a,b) {
  var position = a;

  this.move = function(distance) {
    position += distance;
  };

  this.getDistanceLeft = function() {
    return b - position;
  };
};

describe('Point', function() {
  var p, spy, stub;
  beforeEach(function(done) {
    p = new Point(1,5);
    done();
  });

  describe('getDistanceLeft()', function() {
    it('correctly worked out distance', function() {
      assert.typeOf(p.getDistanceLeft(), 'number', "correct type");
      assert.equal(p.getDistanceLeft(), 4, "correct amount");
    });
    it('reduces distance when move is called', function() {
      p.move(1);
      assert.equal(p.getDistanceLeft(), 3, "We've moved!");
    });
  });
});
