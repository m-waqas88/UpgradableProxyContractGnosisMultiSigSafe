const {expect}=require('chai');
const { ethers } = require('hardhat');

let P3;
let p3;
let accounts;
let msgSender;

describe("ERC20 Upgradeable Proxt contract testing phase3",function(){
    beforeEach(async function(){
        accounts = await ethers.getSigners();
        msgSender = accounts[0].address;
        P3=await ethers.getContractFactory("Phase3");
        p3 =await P3.deploy();
        await p3.deployed();
        console.log(`Phase3 deployed at ${p3.address}`);
    });

    it("Only owner can execute burn function", async() => {
        const wallet = p3.connect(accounts[2]);
        await wallet.initialize(39000);
        await wallet.burn(9000);
        // await p3.burn(9000);
        expect(await p3.totalSupply()).to.equal(30000);
    });
    it("Only owner can execute transfer function", async() => {
        const wallet = p3.connect(accounts[2]);
        await wallet.initialize(39000);
        await wallet.transfer(accounts[3].address, 7000);
        // await p3.transfer(accounts[3].address, 9000);
        expect(await p3.balanceOf(accounts[2].address)).to.equal(32000);
    });
});