const {expect}=require('chai');
const { ethers } = require('hardhat');

let P1;
let p1;

describe("ERC20 contract testing phase1",function(){
    beforeEach(async function(){
        P1=await ethers.getContractFactory("Phase1");
        p1 =await P1.deploy();
        await p1.deployed();
        console.log(`Phase1 deployed at ${p1.address}`);
    });

    it('Minting functionailty test',async() => {
        const amountToBeMinted = 10000;
        await p1.initialize(amountToBeMinted);
        const totalSupply = await p1.totalSupply();
        expect(totalSupply).to.equal(amountToBeMinted);
    });
});