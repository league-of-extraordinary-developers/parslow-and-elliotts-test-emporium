var assert = require('chai').assert,
    sinon = require('sinon');

function Point(a,b) {
  var position = a;

  this.move = function(distance) {
    position += distance;
    //invalidate cache
    this.cachedDistance = null;
  };

  this.calculateDistanceLeft = function() {
    return this.cachedDistance = b - position;
  };

  this.getDistanceLeft = function() {
    return this.cachedDistance || this.calculateDistanceLeft();
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

  describe('Caching', function() {

    beforeEach(function() {
      spy = sinon.spy(p, "calculateDistanceLeft");
    });

    it('cached result', function() {
      p.getDistanceLeft();
      p.getDistanceLeft();
      assert.equal(spy.callCount, 1, "complicated process was called once");
      assert.equal(p.getDistanceLeft(), 4, "correct distance");
    });

    it('correctly invalidated', function() {
      var res = [p.getDistanceLeft(), p.move(1), p.getDistanceLeft()];
      assert.deepEqual(res, [4, undefined, 3], "We've moved");
      assert.equal(spy.callCount, 2, "called again! invalidated!");
    });
  });

});
