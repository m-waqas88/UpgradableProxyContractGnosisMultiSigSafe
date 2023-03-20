const {expect}=require('chai');
const { ethers, upgrades } = require('hardhat');
let P1;
let p1;
let P2;
let p2;

describe("P2 proxy functionality testing",function(){
    beforeEach(async function(){
        P1=await ethers.getContractFactory("Phase1");
        P2=await ethers.getContractFactory("Phase2");

        p1 =await upgrades.deployProxy(P1,[10000],{initializer:"initialize"});
        p2 =await upgrades.upgradeProxy(p1.address,P2);
    });
    it('Check functionality of burning tokens in P2 implementation',async function(){
        const amountToBeBurnt = 2000;
        await p2.burn(amountToBeBurnt);
        const totalSupply = await p2.totalSupply();
        expect(totalSupply).to.equal(8000);
    });
});