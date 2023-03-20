const {expect}=require('chai');
const { ethers, upgrades } = require('hardhat');
let P1;
let p1;

describe("ERC20 Upgradeable Proxt contract testing phase1",function(){
    beforeEach(async function(){
        P1=await ethers.getContractFactory("Phase1");
        p1 =await upgrades.deployProxy(P1,[10000],{initializer:"initialize"});
    });

    it('Check functionality of proxy deployment with initializer',async function(){
        const totalSupply = await p1.totalSupply();
        expect(totalSupply).to.equal(10000);
    });
});