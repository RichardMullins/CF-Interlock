CF.userMain = function() {
	//if the interlock is using the same join for press and feedback 
	//them provide the joins as an array.
	var nofb_il = new Interlock(['d10', 'd11', 'd12']);
	var mom_il = new Interlock(['d20', 'd21', 'd22']);
	var tog_il = new Interlock(['d30', 'd31', 'd32']);

	//If the interlock is using different joins for the press and the
	//feedback them provide the joins as an object in the form 'trigger':'result'
	var diff_il = new Interlock({
		'd40':'d140',
		'd41':'d141',
		'd42':'d142'
	});
}