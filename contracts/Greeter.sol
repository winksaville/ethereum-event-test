pragma solidity ^0.4.7;

/* Simple contract that returns a string */
contract Greeter {
    address private owner; // Owner of the contract
    string private greeting; // Greeting

    event GreeterLog(string key, string data);

    /* Constructor */
    function Greeter() public {
        var initial_greeting = "Hi there";
        owner = msg.sender;
        setGreeting(initial_greeting);
    }

    /* Kill this contract */
    function kill() {
        if (msg.sender == owner) {
            selfdestruct(owner);
            GreeterLog("kill", "successful");
        } else {
            GreeterLog("kill", "not owner");
        }
    }

    /* Return the greeting */
    function setGreeting(string value) {
        GreeterLog("setGreeting", value);
        greeting = value;
    }

    /* Return the greeting */
    function getGreeting() constant returns (string) {
        return greeting;
    }
}
