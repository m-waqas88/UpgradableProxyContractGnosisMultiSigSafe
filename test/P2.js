const {expect}=require('chai');
const { ethers } = require('hardhat');

let P2;
let p2;
let accounts;
let msgSender;

describe("ERC20 Upgradeable Proxt contract testing phase2",function(){
    beforeEach(async function(){
        accounts = await ethers.getSigners();
        msgSender = accounts[0].address;
        P2=await ethers.getContractFactory("Phase2");
        p2 =await P2.deploy();
        await p2.deployed();
        console.log(`Phase2 deployed at ${p2.address}`);
    });

    it('Minting and burning functionailty test',async() => {
        const amountToBeMinted = 10000;
        const amountToBeBurnt = 2000;
        await p2.initialize(amountToBeMinted);
        await p2.burn(amountToBeBurnt);
        const totalSupply = await p2.totalSupply();
        expect(totalSupply).to.equal(amountToBeMinted - amountToBeBurnt);
    });
    it("Amount is transferred", async()=> {
        const amountToBeMinted = 10000;
        await p2.initialize(amountToBeMinted);
        await p2.transfer(accounts[1].address, 2000);
        const tranfereeBalance = await p2.balanceOf(accounts[1].address);
        expect(tranfereeBalance).to.equal(2000);
    });
    it("Approving allowance", async()=> {
        const spender = accounts[1].address;
        await p2.approve(spender, 8000);
        const allowedAmount = await p2.allowance(msgSender, accounts[1].address);
        expect(allowedAmount).to.equal(8000);
    });
    it("Increas allowance", async()=> {
        const spender = accounts[1].address;
        await p2.approve(spender, 8000);
        // await p2.increaseAllowance("0x0000000000000000000000000000000000000000", 5000);
        await p2.increaseAllowance(spender, 5000);
        const allowedAmount = await p2.allowance(msgSender, accounts[1].address);
        expect(allowedAmount).to.equal(13000);
    });
    it("Decrease allowance", async()=> {
        const spender = accounts[1].address;
        await p2.approve(spender, 8000);
        await p2.decreaseAllowance(spender, 5000);
        const allowedAmount = await p2.allowance(msgSender, accounts[1].address);
        expect(allowedAmount).to.equal(3000);
    });
    it("Amount is transferred from", async()=> {
        const amountToBeMinted = 10000;
        let wallet = await p2.connect(accounts[0]);
        await wallet.initialize(amountToBeMinted);
        const spender = accounts[1].address;
        await p2.approve(spender, 8000);
        wallet = p2.connect(accounts[1]);
        await wallet.transferFrom(msgSender, accounts[2].address, 8000);
        const transfereeBalance = await p2.balanceOf(accounts[2].address);
        expect(transfereeBalance).to.equal(8000);
    });
});