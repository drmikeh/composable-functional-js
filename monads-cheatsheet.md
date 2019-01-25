unit :: number -> tuple                                  // put a value inside a container
bind :: f(number -> tuple) -> function(tuple -> tuple)   // make a function composable

unitBind      :: f(number -> tuple)  -> function(tuple -> tuple)  // promote value, then apply
applyUnitBind :: f(number -> number) -> function(number -> tuple) // apply, then promote result
