// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BuyMeACoffee {
    struct Coffee {
        address from;
        uint256 timestamp;
        string name;
        string message;
        uint256 amount;
    }

    event NewCoffee(
        address indexed from,
        uint256 timestamp,
        string name,
        string message,
        uint256 amount
    );

    address payable public owner;
    Coffee[] public coffees;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function buyCoffee(string calldata _name, string calldata _message) external payable {
        require(msg.value > 0, "Must send MON to buy coffee");

        coffees.push(Coffee(msg.sender, block.timestamp, _name, _message, msg.value));

        emit NewCoffee(msg.sender, block.timestamp, _name, _message, msg.value);
    }

    function getCoffees() external view returns (Coffee[] memory) {
        return coffees;
    }

    function getCoffeeCount() external view returns (uint256) {
        return coffees.length;
    }

    function withdrawTips() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No tips to withdraw");
        (bool sent, ) = owner.call{value: balance}("");
        require(sent, "Failed to withdraw");
    }

    function transferOwnership(address payable _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }

    receive() external payable {
        coffees.push(Coffee(msg.sender, block.timestamp, "Anonymous", "Direct transfer", msg.value));
        emit NewCoffee(msg.sender, block.timestamp, "Anonymous", "Direct transfer", msg.value);
    }
}
