# A simple contract with an event

Dependencies: testrpc and truffle

To build and run:
```
testrpc -d debugger
rm -rf build
truffle migrate
truffle build
```

Then use chrome to view build/index.html, you should see "Hi from Greeter".
You can also change the greeting by filling in the `New Greeting` text box
and pressing the `Set Greeting` button doing so will generate the a GreeterLog
event which will be output on the chrome console.
