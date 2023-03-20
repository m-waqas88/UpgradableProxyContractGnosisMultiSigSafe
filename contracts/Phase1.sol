// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Phase1 {
    bool private executing;
    address private owner;
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals;

    event Transfer(address indexed from, address indexed to, uint value);

    function initialize(uint amount) external {
        owner = msg.sender;
        name = "Assignment Tokens";
        symbol = "AT";
        decimals = 18;
        _mint(amount);
    }

    function _mint(uint amount) internal {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }
}
