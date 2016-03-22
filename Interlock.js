function Interlock(joins, initial) {
	this.current = '';
	this.last = '';
  this.joins = joins
  this.initial = initial

	if(this.joins instanceof Array) {
    console.log('watching joins')
    console.log(this.joins)

    if(joins.indexOf(this.initial) !== -1) setJoins.call(this, this.initial, 1)

		CF.watch(CF.ObjectPressedEvent, this.joins, setJoins.bind(this))
		CF.watch(CF.JoinChangeEvent, this.joins, setJoins.bind(this));
	}
	else if(typeof this.joins === 'object') {
    console.log('watching joins')
    var joins = Object.keys(this.joins)
    console.log(joins)

    if(joins.indexOf(this.initial) !== -1) {
      console.log('stuff')
      objSetJoins.call(this,this.initial, 1)
    }

		CF.watch(CF.ObjectPressedEvent, joins, objSetJoins.bind(this));
		CF.watch(CF.JoinChangeEvent, joins, objSetJoins.bind(this));
	}
	else
		CF.log("Joins need to be specified as an object in the form 'trigger':'result'");
	

  /** set joins for matching input and output */
  function setJoins(j, v) {
    if(parseInt(v) === 1) {
      this.last = this.current
      this.current = j

      var joinList = this.joins.map(function(join) {
        return {join: join, value: 0}
      })
      CF.setJoins(joinList, false)
      CF.setJoin(j, 1, false)
    }
  }

  /** set joins for joins with different inputs and outputs */
  function objSetJoins(j, v) {
    if(parseInt(v) === 1) {
      this.last = this.current
      this.current = j
      Object.keys(this.joins).map(function(join) {
        var joinList = Object.keys(this.joins).map(function(join) {
          return {join: this.joins[join], value: 0}
        }.bind(this))
        CF.setJoins(joinList, false)
        CF.setJoin(this.joins[j], 1, false)
      }.bind(this)) 
    }
  }
}