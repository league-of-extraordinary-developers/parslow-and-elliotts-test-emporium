var assert = require('chai').assert,
    sinon = require('sinon');

function Point(a,b) {
  position = a;

  this.move = function(distance) {
    position += distance;
    this.cachedDistance = null;
  };

  this.getDistanceLeft = function() {
    return this.cachedDistance || this.calculateDistanceLeft();
  };

  this.calculateDistanceLeft = function() {
    return this.cachedDistance = b - position;
  };

  this.areWeThereYet = function() { return this.getDistanceLeft() === 0 };
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

  describe('Are we there yet?', function() {

    describe('Without stub', function() {
      it('knows we are not there already', function() {
        assert.ok(!p.areWeThereYet(), "we are not there!");
      });
    });

    describe('With stub', function() {

      beforeEach(function() {
        stub = sinon.stub(p, "getDistanceLeft");
        stub.returns(0);
      });

      it('Thinks were there because of stub!!!!!111', function() {
        assert.ok(p.areWeThereYet(), "we are there!");
      });
    });

  });

});
