function Interlock(joins) {
	this.current = '';
	this.last = '';
  this.joins = joins
  
	if(this.joins instanceof Array) {
    console.log('watching joins')
    console.log(this.joins)
		//we want to have the press set the join
		CF.watch(CF.ObjectPressedEvent, this.joins, setJoins.bind(this))
		CF.watch(CF.JoinChangeEvent, this.joins, setJoins.bind(this));
	}
	else if(typeof this.joins === 'object') {
    console.log('watching joins')
    console.log(Object.keys(this.joins))
		//we have triggers and results
		CF.watch(CF.ObjectPressedEvent, Object.keys(this.joins), objSetJoins.bind(this));
		CF.watch(CF.JoinChangeEvent, Object.keys(this.joins), objSetJoins.bind(this));
	}
	else
		CF.log("Joins need to be specified as an object in the form 'trigger':'result'");
	

  function setJoins(j, v) {
    if(v === 1) {
      this.last = this.current
      this.current = j

      var joinList = this.joins.map(function(join) {
        return {join: join, value: 0}
      })
      CF.setJoins(joinList, false)
      CF.setJoin(j, 1, false)
    }
  }

  function objSetJoins(j, v) {
    if(v === 1) {
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