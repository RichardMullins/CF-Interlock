# CF-Interlock
Interlock module for Command Fusion iViewer projets

This module can be included in your iViewer projects to provide a simple Interlock, primaily for managing subpage display. 

An interlock is designed to ensure that one one of the specified outputs is active at any one time. Selecting an input will cause that matching output to go high and all other outputs to go low. The interlock is break before make.

## usage
You can create a new interlock in by instantiating a new interlock passing the joins that you wish to control.

```
var av_screens = new Interlock(['d10', 'd11', 'd12']);
```
This will set up an interlock that uses the same joins for the input and output. This is useful if you have side menu buttons that you want to highlight at the same time as the screens are being shown.


alternatively you can set it up as follows

```
var main_il = new Interlock({
		'd40':'d140',
		'd41':'d141',
		'd42':'d142'
	})
```

This configuration allows for an ipput to drive a different output. This can be used where keeping the state of the inputs doesn't make sense (where the buttons are on a different page for example so you will never see the state).

The interlock input joins can be triggered with either a press or by using CF.setJoin.

A demo GUI file is included in this repo.



