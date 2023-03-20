// scripts/deploy.js
async function main() {
    const P1 = await ethers.getContractFactory("Phase1");
    console.log("Deploying Phase1...");
    const p1 = await upgrades.deployProxy(P1, [1000000], { initializer: 'initialize' });
    console.log("ERC20 Phase 1 deployed to:", p1.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });