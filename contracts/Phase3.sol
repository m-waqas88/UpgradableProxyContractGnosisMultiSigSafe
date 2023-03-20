// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Phase3 {
    error InvalidAmount();
    error InvalidAddress();
    error notOwner();
    modifier CheckAmount(uint amount) {
        if (amount < 1) {
            revert InvalidAmount();
        }
        _;
    }
    modifier CheckAddress(address recipient) {
        if (recipient == address(0)) {
            revert InvalidAddress();
        }
        _;
    }
    modifier ValidateAllowance(
        address sender,
        address spender,
        uint amount
    ) {
        uint currentAllowance;
        if (sender == address(0)) {
            currentAllowance = allowance[msg.sender][spender];
        } else {
            currentAllowance = allowance[sender][msg.sender];
        }
        require(currentAllowance >= amount, "Not enough allowance");
        _;
    }
    modifier onlyOwner()
    {
      if(msg.sender != owner){
        revert notOwner();
      }
      _;
    }
    modifier Reentrant()
    {
      if(!executing) {
        executing = true;
        _;
      }
      executing = false;
    }
    bool private executing;
    address private owner;
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    event AllowanceIncreased(
        address indexed owner,
        address indexed spender,
        uint value
    );
    event AllowanceDecreased(
        address indexed owner,
        address indexed spender,
        uint value
    );

    function initialize(uint amount) external {
        owner = msg.sender;
        name = "Assignment Tokens";
        symbol = "AT";
        decimals = 18;
        _mint(amount);
    }

    function _mint(uint amount) public Reentrant {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(uint amount) external onlyOwner Reentrant {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }

    function transfer(
        address recipient,
        uint amount
    ) external Reentrant onlyOwner CheckAmount(amount) CheckAddress(recipient) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
    }

    function approve(
        address spender,
        uint amount
    ) external CheckAmount(amount) CheckAddress(spender) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
    }

    function increaseAllowance(
        address spender,
        uint amount
    ) external CheckAmount(amount) CheckAddress(spender) {
        allowance[msg.sender][spender] += amount;
        emit AllowanceIncreased(msg.sender, spender, amount);
    }

    function decreaseAllowance(
        address spender,
        uint amount
    )
        external
        CheckAmount(amount)
        CheckAddress(spender)
        ValidateAllowance(address(0), spender, amount)
    {
        allowance[msg.sender][spender] -= amount;
        emit AllowanceDecreased(msg.sender, spender, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    )
        external
        Reentrant
        CheckAmount(amount)
        CheckAddress(sender)
        CheckAddress(recipient)
        ValidateAllowance(sender, msg.sender, amount)
    {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }
}
